from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os
from app.api import endpoints

app = FastAPI(
    title="AI Government Scheme & Subsidy Finder API",
    description="Backend API serving the AI chat analysis module connecting to OpenRouter.",
    version="1.0.0"
)

# CORS configuration to allow local frontend to communicate
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For dev only, restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API router
app.include_router(endpoints.router, prefix="/api", tags=["ai"])

# Serve frontend static files
frontend_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), "frontend")
app.mount("/static", StaticFiles(directory=frontend_dir), name="static")

@app.get("/")
def serve_frontend():
    return FileResponse(os.path.join(frontend_dir, "index.html"))

@app.get("/health")
def health_check():
    return {"status": "ok", "message": "AI Government Scheme Finder API"}
