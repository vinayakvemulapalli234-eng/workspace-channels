from fastapi import APIRouter, HTTPException
from bson import ObjectId
from database import db
from schemas import MessageCreate, MessageResponse
from models import message_helper, message_document
from typing import List

router = APIRouter()

@router.post("/channels/{channel_id}/messages", response_model=MessageResponse, status_code=201)
async def send_message(channel_id: str, payload: MessageCreate):
    channel = await db.channels.find_one({"_id": ObjectId(channel_id)})
    if not channel:
        raise HTTPException(status_code=404, detail="Channel not found")
    doc = message_document(channel_id, payload.model_dump())
    result = await db.channel_messages.insert_one(doc)
    created = await db.channel_messages.find_one({"_id": result.inserted_id})
    return message_helper(created)

@router.get("/channels/{channel_id}/messages", response_model=List[MessageResponse])
async def get_messages(channel_id: str):
    channel = await db.channels.find_one({"_id": ObjectId(channel_id)})
    if not channel:
        raise HTTPException(status_code=404, detail="Channel not found")
    messages = []
    async for message in db.channel_messages.find({"channel_id": channel_id}).sort("created_at", 1):
        messages.append(message_helper(message))
    return messages