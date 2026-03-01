import os
from pydantic_settings import BaseSettings

class AISettings(BaseSettings):
    """
    Configuration for the AI Service module.
    Automatically loads these values from the environment variables or a .env file.
    """
    OPENROUTER_API_KEY: str = "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"
    
    # Model Configuration
    DEFAULT_LLM_MODEL: str = "deepseek/deepseek-chat"
    CHEAP_MODEL: str = "mistralai/mistral-large"
    PREMIUM_MODEL: str = "anthropic/claude-3-haiku"
    
    # API Settings
    OPENROUTER_BASE_URL: str = "https://openrouter.ai/api/v1/chat/completions"
    OPENROUTER_TIMEOUT_SECONDS: int = 30
    
    # Application limits
    MAX_RETRIES: int = 1
    MAX_TOKENS: int = 2000

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

# Instantiate a global settings object
ai_config = AISettings()
