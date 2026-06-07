import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

export const getChannels = () => API.get("/channels");
export const createChannel = (data) => API.post("/channels", data);
export const getChannel = (id) => API.get(`/channels/${id}`);
export const updateChannel = (id, data) => API.put(`/channels/${id}`, data);
export const deleteChannel = (id) => API.delete(`/channels/${id}`);
export const getMessages = (channelId) => API.get(`/channels/${channelId}/messages`);
export const sendMessage = (channelId, data) => API.post(`/channels/${channelId}/messages`, data);