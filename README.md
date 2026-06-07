# Workspace Channels

A full-stack workspace messaging application built with React, FastAPI, and MongoDB.

## Tech Stack
- **Frontend:** React + Vite
- **Backend:** FastAPI (Python)
- **Database:** MongoDB Atlas

## Setup Instructions

### Backend
```bash
cd backend
pip install fastapi uvicorn motor python-dotenv pydantic
```
Create `.env` file inside backend/:
Run:
```bash
uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/channels | Get all channels |
| POST | /api/channels | Create channel |
| GET | /api/channels/{id} | Get channel |
| PUT | /api/channels/{id} | Update channel |
| DELETE | /api/channels/{id} | Delete channel |
| GET | /api/channels/{id}/messages | Get messages |
| POST | /api/channels/{id}/messages | Send message |

## Database Schema

### channels
```json
{
  "_id": "ObjectId",
  "name": "string",
  "description": "string",
  "created_at": "datetime"
}
```

### channel_messages
```json
{
  "_id": "ObjectId",
  "channel_id": "string",
  "text": "string",
  "sender_name": "string",
  "created_at": "datetime"
}
```

## Features
- Create, view, delete channels
- Send and receive messages
- Real-time message polling every 3 seconds
- Search channels by name
- Clean responsive UI