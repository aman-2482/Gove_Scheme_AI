from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import endpoints

app = FastAPI(
    title="AI Government Scheme & Subsidy Finder API",
    description="Backend API for the AI-powered Government Scheme Finder. Connects to OpenRouter LLMs.",
    version="1.0.0"
)

# CORS — allows the React dev server (localhost:5173) and any other origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API routes
app.include_router(endpoints.router, prefix="/api", tags=["ai"])

@app.get("/health")
def health_check():
    return {"status": "ok", "message": "AI Government Scheme Finder API is running"}
