import json
import logging
import httpx
from typing import Optional, Dict, Any
from app.core.ai_config import ai_config
from app.schemas.ai import SchemeAnalysisResponse

logger = logging.getLogger(__name__)

class AIService:
    def __init__(self):
        self.headers = {
            "Authorization": f"Bearer {ai_config.OPENROUTER_API_KEY}",
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost:8000", # Optional but recommended by OpenRouter
            "X-Title": "Gov Scheme Finder" # Optional
        }

    def _get_system_prompt_with_schema(self, base_system_prompt: str) -> str:
        """Injects JSON schema requirements into the system prompt."""
        
        schema_format = SchemeAnalysisResponse.model_json_schema()
        
        return (
            f"{base_system_prompt}\n\n"
            "CRITICAL REQUIREMENT:\n"
            "You MUST respond ONLY with a valid, raw JSON object representing your analysis.\n"
            "Do not include markdown code blocks, backticks (```json), or any conversational text before or after the JSON.\n"
            f"The JSON object MUST strictly adhere to the following schema:\n"
            f"{json.dumps(schema_format, indent=2)}\n"
        )

    async def generate_completion(
        self,
        system_prompt: str,
        user_prompt: str,
        model: Optional[str] = None,
        temperature: float = 0.2,
        is_retry: bool = False
    ) -> Dict[str, Any]:
        """
        Calls OpenRouter API. Handles JSON formatting and standard retry/fallback logic.
        """
        
        target_model = model or ai_config.DEFAULT_LLM_MODEL
        
        if is_retry:
            target_model = ai_config.CHEAP_MODEL
            logger.warning(f"Retrying prompt. Falling back to CHEAP_MODEL: {target_model}")
            
        system_content = self._get_system_prompt_with_schema(system_prompt)

        payload = {
            "model": target_model,
            "messages": [
                {"role": "system", "content": system_content},
                {"role": "user", "content": user_prompt}
            ],
            "temperature": temperature,
            "max_tokens": ai_config.MAX_TOKENS,
            "response_format": {"type": "json_object"}
        }

        async with httpx.AsyncClient(timeout=ai_config.OPENROUTER_TIMEOUT_SECONDS) as client:
            try:
                response = await client.post(
                    ai_config.OPENROUTER_BASE_URL,
                    headers=self.headers,
                    json=payload
                )
                response.raise_for_status()
                data = response.json()
                
                # Extract token usage
                usage = data.get("usage", {})
                total_tokens = usage.get("total_tokens", 0)
                
                # Extract message content
                content = data["choices"][0]["message"]["content"]
                
                # Attempt to parse json
                parsed_content = json.loads(content)
                
                # Validate against Pydantic schema
                validated_data = SchemeAnalysisResponse(**parsed_content)

                return {
                    "success": True,
                    "data": validated_data.model_dump(),
                    "tokens_used": total_tokens,
                    "model_used": target_model
                }

            except json.JSONDecodeError as e:
                logger.error(f"Failed to parse JSON from AI response: {content}. Error: {e}")
                if not is_retry:
                    correction_prompt = f"Previous response was invalid JSON. Error: {e}. Fix the formatting."
                    return await self.generate_completion(system_prompt, f"{user_prompt}\n\n{correction_prompt}", model, temperature, is_retry=True)
                return {"success": False, "error": "Invalid JSON format returned by AI."}

            except Exception as e:
                logger.error(f"Error calling OpenRouter or validating schema: {e}")
                # Fallback to CHEAP_MODEL if primary model failed with HTTP error
                if not is_retry:
                    return await self.generate_completion(system_prompt, user_prompt, model, temperature, is_retry=True)
                return {"success": False, "error": str(e)}

        # Explicit fallback return to satisfy all code paths
        return {"success": False, "error": "Unexpected error: no response generated."}

    # Stub for future RAG injection
    async def get_rag_context_for_scheme(self, query: str) -> str:
        """
        Mock function to represent PostgreSQL vector/full-text search.
        """
        return "Context: The Solar Panel Scheme provides up to 50,000 INR for residential setups. Demographics: urban and rural."
