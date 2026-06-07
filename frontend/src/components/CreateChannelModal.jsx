import { useState } from "react";
import { createChannel } from "../api/client";

function CreateChannelModal({ onClose, onCreated }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!name.trim()) {
      setError("Channel name is required");
      return;
    }
    try {
      setLoading(true);
      await createChannel({ name, description });
      onCreated();
      onClose();
    } catch (err) {
      setError(err.response?.data?.detail || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: "fixed", inset: 0,
      background: "rgba(0,0,0,0.5)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 1000,
    }}>
      <div style={{
        background: "#fff", borderRadius: "16px",
        padding: "32px", width: "100%", maxWidth: "440px",
        boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
      }}>
        <h2 style={{ marginBottom: "24px", fontSize: "20px", fontWeight: "700" }}>
          Create Channel
        </h2>

        {error && (
          <p style={{ color: "red", fontSize: "13px", marginBottom: "12px" }}>
            {error}
          </p>
        )}

        <input
          type="text"
          placeholder="Channel Name *"
          value={name}
          onChange={e => setName(e.target.value)}
          style={{
            width: "100%", padding: "12px 16px",
            border: "1px solid #e5e7eb", borderRadius: "8px",
            fontSize: "14px", marginBottom: "12px",
          }}
        />

        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={3}
          style={{
            width: "100%", padding: "12px 16px",
            border: "1px solid #e5e7eb", borderRadius: "8px",
            fontSize: "14px", marginBottom: "20px", resize: "none",
          }}
        />

        <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
          <button
            onClick={onClose}
            style={{
              padding: "10px 20px", borderRadius: "8px",
              border: "1px solid #e5e7eb", background: "#fff",
              fontSize: "14px", fontWeight: "500",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              padding: "10px 20px", borderRadius: "8px",
              border: "none", background: "#4f46e5",
              color: "#fff", fontSize: "14px", fontWeight: "600",
            }}
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateChannelModal;