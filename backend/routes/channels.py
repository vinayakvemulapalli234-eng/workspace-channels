from fastapi import APIRouter, HTTPException
from bson import ObjectId
from database import db
from schemas import ChannelCreate, ChannelResponse
from models import channel_helper, channel_document
from typing import List

router = APIRouter()

@router.post("/channels", response_model=ChannelResponse, status_code=201)
async def create_channel(payload: ChannelCreate):
    existing = await db.channels.find_one({"name": payload.name})
    if existing:
        raise HTTPException(status_code=400, detail="Channel name already exists")
    doc = channel_document(payload.model_dump())
    result = await db.channels.insert_one(doc)
    created = await db.channels.find_one({"_id": result.inserted_id})
    return channel_helper(created)

@router.get("/channels", response_model=List[ChannelResponse])
async def get_channels():
    channels = []
    async for channel in db.channels.find():
        channels.append(channel_helper(channel))
    return channels

@router.get("/channels/{channel_id}", response_model=ChannelResponse)
async def get_channel(channel_id: str):
    channel = await db.channels.find_one({"_id": ObjectId(channel_id)})
    if not channel:
        raise HTTPException(status_code=404, detail="Channel not found")
    return channel_helper(channel)

@router.put("/channels/{channel_id}", response_model=ChannelResponse)
async def update_channel(channel_id: str, payload: ChannelCreate):
    channel = await db.channels.find_one({"_id": ObjectId(channel_id)})
    if not channel:
        raise HTTPException(status_code=404, detail="Channel not found")
    await db.channels.update_one(
        {"_id": ObjectId(channel_id)},
        {"$set": {"name": payload.name, "description": payload.description}}
    )
    updated = await db.channels.find_one({"_id": ObjectId(channel_id)})
    return channel_helper(updated)

@router.delete("/channels/{channel_id}", status_code=204)
async def delete_channel(channel_id: str):
    channel = await db.channels.find_one({"_id": ObjectId(channel_id)})
    if not channel:
        raise HTTPException(status_code=404, detail="Channel not found")
    await db.channels.delete_one({"_id": ObjectId(channel_id)})
    await db.channel_messages.delete_many({"channel_id": channel_id})