import { useState, useEffect } from "react";
import { getChannels } from "../api/client";
import ChannelCard from "../components/ChannelCard";
import CreateChannelModal from "../components/CreateChannelModal";

function ChannelList() {
  const [channels, setChannels] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchChannels = async () => {
    try {
      const res = await getChannels();
      setChannels(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChannels();
  }, []);

  const filtered = channels.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ minHeight: "100vh", background: "#f0f2f5" }}>
      {/* Header */}
      <div style={{
        background: "#4f46e5", padding: "20px 32px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <h1 style={{ color: "#fff", fontSize: "22px", fontWeight: "700" }}>
          Workspace Channels
        </h1>
        <button
          onClick={() => setShowModal(true)}
          style={{
            background: "#fff", color: "#4f46e5",
            border: "none", borderRadius: "8px",
            padding: "10px 20px", fontWeight: "600", fontSize: "14px",
          }}
        >
          + New Channel
        </button>
      </div>

      {/* Content */}
      <div style={{ maxWidth: "720px", margin: "0 auto", padding: "32px 16px" }}>
        {/* Search */}
        <input
          type="text"
          placeholder="Search channels..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: "100%", padding: "12px 16px",
            border: "1px solid #e5e7eb", borderRadius: "8px",
            fontSize: "14px", marginBottom: "24px",
            background: "#fff",
          }}
        />

        {loading ? (
          <p style={{ textAlign: "center", color: "#6b7280" }}>Loading...</p>
        ) : filtered.length === 0 ? (
          <p style={{ textAlign: "center", color: "#6b7280" }}>
            No channels found. Create one!
          </p>
        ) : (
          filtered.map(channel => (
            <ChannelCard key={channel.id} channel={channel} />
          ))
        )}
      </div>

      {showModal && (
        <CreateChannelModal
          onClose={() => setShowModal(false)}
          onCreated={fetchChannels}
        />
      )}
    </div>
  );
}

export default ChannelList;