import { useNavigate } from "react-router-dom";

function ChannelCard({ channel }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/channels/${channel.id}`)}
      style={{
        background: "#ffffff",
        borderRadius: "12px",
        padding: "20px",
        marginBottom: "12px",
        cursor: "pointer",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        borderLeft: "4px solid #4f46e5",
        transition: "transform 0.2s",
      }}
      onMouseEnter={e => e.currentTarget.style.transform = "translateX(4px)"}
      onMouseLeave={e => e.currentTarget.style.transform = "translateX(0)"}
    >
      <h3 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "6px" }}>
        # {channel.name}
      </h3>
      <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "8px" }}>
        {channel.description || "No description"}
      </p>
      <p style={{ fontSize: "12px", color: "#9ca3af" }}>
        Created: {new Date(channel.created_at).toLocaleDateString()}
      </p>
    </div>
  );
}

export default ChannelCard;