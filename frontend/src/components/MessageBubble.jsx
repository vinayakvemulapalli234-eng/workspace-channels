function MessageBubble({ message }) {
  return (
    <div style={{
      marginBottom: "16px",
      padding: "12px 16px",
      background: "#ffffff",
      borderRadius: "12px",
      boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      maxWidth: "70%",
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        marginBottom: "6px",
      }}>
        <div style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          background: "#4f46e5",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "700",
          fontSize: "14px",
        }}>
          {message.sender_name.charAt(0).toUpperCase()}
        </div>
        <span style={{ fontWeight: "600", fontSize: "14px" }}>
          {message.sender_name}
        </span>
        <span style={{ fontSize: "11px", color: "#9ca3af" }}>
          {new Date(message.created_at).toLocaleTimeString()}
        </span>
      </div>
      <p style={{ fontSize: "14px", color: "#374151", paddingLeft: "40px" }}>
        {message.text}
      </p>
    </div>
  );
}

export default MessageBubble;