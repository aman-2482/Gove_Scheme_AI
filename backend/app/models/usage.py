import enum
from sqlalchemy import Column, Integer, String, Float, DateTime, Enum, func
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class EndpointTypeEnum(str, enum.Enum):
    CHAT = "chat"
    SUMMARY = "summary"
    ELIGIBILITY = "eligibility"
    REPORT = "report"

class AIUsageLog(Base):
    __tablename__ = "ai_usage_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String, index=True, nullable=True) # Assume simple string for user identifier
    model_used = Column(String, nullable=False)
    tokens_used = Column(Integer, default=0, nullable=False)
    endpoint_type = Column(Enum(EndpointTypeEnum), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
