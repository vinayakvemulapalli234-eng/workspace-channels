import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getChannel, getMessages, sendMessage } from "../api/client";
import MessageBubble from "../components/MessageBubble";

function ChannelDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [channel, setChannel] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [senderName, setSenderName] = useState("");
  const [loading, setLoading] = useState(true);
  const bottomRef = useRef(null);

  const fetchChannel = async () => {
    try {
      const res = await getChannel(id);
      setChannel(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchMessages = async () => {
    try {
      const res = await getMessages(id);
      setMessages(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChannel();
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, [id]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!text.trim() || !senderName.trim()) return;
    try {
      await sendMessage(id, { text, sender_name: senderName });
      setText("");
      fetchMessages();
    } catch (err) {
      console.error(err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f0f2f5", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{
        background: "#4f46e5", padding: "16px 32px",
        display: "flex", alignItems: "center", gap: "16px",
      }}>
        <button
          onClick={() => navigate("/")}
          style={{
            background: "rgba(255,255,255,0.2)", border: "none",
            color: "#fff", borderRadius: "8px", padding: "8px 14px",
            fontSize: "14px", fontWeight: "600",
          }}
        >
          ← Back
        </button>
        <div>
          <h1 style={{ color: "#fff", fontSize: "18px", fontWeight: "700" }}>
            # {channel?.name}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "13px" }}>
            {channel?.description}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1, overflowY: "auto", padding: "24px 32px",
        maxWidth: "800px", width: "100%", margin: "0 auto",
      }}>
        {loading ? (
          <p style={{ textAlign: "center", color: "#6b7280" }}>Loading messages...</p>
        ) : messages.length === 0 ? (
          <p style={{ textAlign: "center", color: "#6b7280" }}>
            No messages yet. Be the first to say something!
          </p>
        ) : (
          messages.map(msg => (
            <MessageBubble key={msg.id} message={msg} />
          ))
        )}
        <div ref={bottomRef} />
      </div>

      {/* Message Input */}
      <div style={{
        background: "#fff", padding: "16px 32px",
        boxShadow: "0 -2px 10px rgba(0,0,0,0.06)",
      }}>
        <div style={{
          maxWidth: "800px", margin: "0 auto",
          display: "flex", gap: "12px", alignItems: "center",
        }}>
          <input
            type="text"
            placeholder="Your name"
            value={senderName}
            onChange={e => setSenderName(e.target.value)}
            style={{
              width: "160px", padding: "12px 16px",
              border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "14px",
            }}
          />
          <input
            type="text"
            placeholder="Type a message... (Enter to send)"
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{
              flex: 1, padding: "12px 16px",
              border: "1px solid #e5e7eb", borderRadius: "8px", fontSize: "14px",
            }}
          />
          <button
            onClick={handleSend}
            style={{
              background: "#4f46e5", color: "#fff",
              border: "none", borderRadius: "8px",
              padding: "12px 24px", fontWeight: "600", fontSize: "14px",
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChannelDetail;