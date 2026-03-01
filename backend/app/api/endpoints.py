from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from app.schemas.ai import AIChatRequest, AIChatResponse, SchemeAnalysisResponse
from app.services.ai_service import AIService
# In a real app we would depend on get_db to inject Postgres session here 

router = APIRouter()

def get_ai_service():
    return AIService()
    
# Mock dependency
def get_db():
    yield None

# Mock logging utility
def log_ai_usage_in_background(db_session, user_id: str, model_used: str, tokens_used: int, endpoint_type: str):
    """
    Simulates writing the AI usage log to the Postgres database in the background
    """
    print(f"[BACKGROUND] Logging AI usage - User: {user_id}, Model: {model_used}, Tokens: {tokens_used}, Endpoint: {endpoint_type}")

@router.post("/chat", response_model=AIChatResponse)
async def chat_with_ai(
    request: AIChatRequest,
    background_tasks: BackgroundTasks,
    ai_service: AIService = Depends(get_ai_service),
    db: None = Depends(get_db) # Mocked DB
):
    """
    Receives user query. 
    1. Fetches RAG context from DB (mocked for now).
    2. Constructs prompt.
    3. Calls OpenRouter via AIService.
    4. Logs token usage in the background.
    """
    
    # 1. Basic RAG retrieval 
    context = await ai_service.get_rag_context_for_scheme(request.user_prompt)
    
    # 2. Construct System Prompt overriding 
    system_prompt = request.system_prompt or (
        "You are an expert AI assistant for the 'AI Government Scheme & Subsidy Finder', specialized in Indian government welfare, agriculture, "
        "solar energy, housing, education, and business subsidy schemes.\n\n"
        f"Context Retrieved from Database:\n{context}\n\n"
        "Base your analysis on the above context where relevant, and supplement with your knowledge of real Indian government schemes. "
        "You MUST include genuine, working government portal URLs in 'apply_links' — use ONLY official Indian government websites (e.g., pmkusum.mnre.gov.in, mahadbt.maharashtra.gov.in, "
        "pmkisan.gov.in, pmgsy.nic.in, schemes.gov.in etc.). "
        "If the context does not contain enough information, say 'Insufficient information' in the relevant field."
    )
    
    # 3. Generate Completion
    result = await ai_service.generate_completion(
        system_prompt=system_prompt,
        user_prompt=request.user_prompt,
        model=request.model,
        temperature=request.temperature
    )

    if not result.get("success"):
        raise HTTPException(status_code=500, detail=result.get("error", "Unknown error when calling AI service"))
        
    # 4. Background logging pattern
    if result.get("tokens_used", 0) > 0:
         background_tasks.add_task(
            log_ai_usage_in_background,
            db_session=db,
            user_id=request.user_id,
            model_used=result.get("model_used"),
            tokens_used=result.get("tokens_used"),
            endpoint_type="chat"
        )
        
    return AIChatResponse(
        success=True,
        data=SchemeAnalysisResponse(**result["data"]),
        tokens_used=result.get("tokens_used", 0),
        model_used=result.get("model_used"),
        error=None
    )
