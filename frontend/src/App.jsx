import { Routes, Route } from "react-router-dom";
import ChannelList from "./pages/ChannelList";
import ChannelDetail from "./pages/ChannelDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ChannelList />} />
      <Route path="/channels/:id" element={<ChannelDetail />} />
    </Routes>
  );
}

export default App;