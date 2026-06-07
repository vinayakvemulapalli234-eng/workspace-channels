from pydantic import BaseModel
from typing import Optional
from datetime import datetime

# Channel Schemas
class ChannelCreate(BaseModel):
    name: str
    description: Optional[str] = None

class ChannelResponse(BaseModel):
    id: str
    name: str
    description: Optional[str] = None
    created_at: datetime

# Message Schemas
class MessageCreate(BaseModel):
    text: str
    sender_name: str

class MessageResponse(BaseModel):
    id: str
    channel_id: str
    text: str
    sender_name: str
    created_at: datetime