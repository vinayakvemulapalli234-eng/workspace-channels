from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.channels import router as channels_router
from routes.messages import router as messages_router

app = FastAPI(title="Workspace Channels API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(channels_router, prefix="/api")
app.include_router(messages_router, prefix="/api")

@app.get("/")
async def root():
    return {"message": "Workspace Channels API is running"}