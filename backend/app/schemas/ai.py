from typing import List, Optional, Any, Dict
from pydantic import BaseModel, Field

# --- Response Schemas --- 
# This defines the structured JSON output we expect from the OpenRouter LLM

class ApplyLink(BaseModel):
    name: str = Field(description="Human-readable label for the application portal, e.g. 'PM-KUSUM Official Portal'")
    url: str = Field(description="The genuine, direct URL to the government application page or portal.")

class SchemeAnalysisResponse(BaseModel):
    summary: str = Field(description="A simplified, user-friendly summary of the scheme or topic.")
    eligibility_reason: str = Field(description="Explanation of why the user might or might not be eligible.")
    recommended_actions: List[str] = Field(description="A list of 2-3 actionable next steps for the user.")
    risk_notes: List[str] = Field(description="Any caveats, risks, or warnings associated with the scheme.")
    apply_links: List[ApplyLink] = Field(
        default=[],
        description="List of genuine government portal URLs where the user can apply for the scheme. Use ONLY real, verified government .gov.in or official URLs."
    )

    class Config:
        json_schema_extra = {
            "example": {
                "summary": "This scheme provides a 50% subsidy for solar panel installation.",
                "eligibility_reason": "You match the demographic criteria, but require a minimum of 2 acres of land.",
                "recommended_actions": ["Gather land ownership documents", "Apply via the state portal"],
                "risk_notes": ["Funding is limited and allocated on a first-come, first-served basis."],
                "apply_links": [
                    {"name": "PM-KUSUM Official Portal", "url": "https://pmkusum.mnre.gov.in/"},
                    {"name": "Maharashtra Agri Dept Portal", "url": "https://mahadbt.maharashtra.gov.in/"}
                ]
            }
        }

# --- Request Schemas ---

class AIChatRequest(BaseModel):
    user_prompt: str
    system_prompt: Optional[str] = None
    model: Optional[str] = None
    temperature: Optional[float] = 0.2
    user_id: Optional[str] = "anonymous"

class AIChatResponse(BaseModel):
    success: bool
    data: Optional[SchemeAnalysisResponse] = None
    error: Optional[str] = None
    tokens_used: Optional[int] = 0
    model_used: Optional[str] = None

# --- DB Schema ---

class AIUsageLogCreate(BaseModel):
    user_id: Optional[str] = None
    model_used: str
    tokens_used: int
    endpoint_type: str
