from datetime import datetime, timezone

def channel_helper(channel) -> dict:
    return {
        "id": str(channel["_id"]),
        "name": channel["name"],
        "description": channel.get("description", ""),
        "created_at": channel["created_at"]
    }

def message_helper(message) -> dict:
    return {
        "id": str(message["_id"]),
        "channel_id": message["channel_id"],
        "text": message["text"],
        "sender_name": message["sender_name"],
        "created_at": message["created_at"]
    }

def channel_document(data: dict) -> dict:
    return {
        "name": data["name"],
        "description": data.get("description", ""),
        "created_at": datetime.now(timezone.utc)
    }

def message_document(channel_id: str, data: dict) -> dict:
    return {
        "channel_id": channel_id,
        "text": data["text"],
        "sender_name": data["sender_name"],
        "created_at": datetime.now(timezone.utc)
    }