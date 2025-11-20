// src/pages/MapPage.jsx
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Navbar from "../components/Shared/Navbar";
import Sidebar from "../components/Home/Sidebar";
import axios from "axios";

const Map = () => {
  const [posts, setPosts] = useState([]);
  const [helpers, setHelpers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const postsRes = await axios.get("/api/posts");
      setPosts(postsRes.data);

      const helpersRes = await axios.get("/api/users/helpers");
      setHelpers(helpersRes.data);
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <MapContainer center={[27.7, 85.3]} zoom={13} className="h-[600px] w-full">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {posts.map((post) => (
              <Marker
                key={post._id}
                position={[post.location.coordinates[1], post.location.coordinates[0]]}
              >
                <Popup>{post.text}</Popup>
              </Marker>
            ))}
            {helpers.map((helper) => (
              <Marker
                key={helper._id}
                position={[helper.location.coordinates[1], helper.location.coordinates[0]]}
              >
                <Popup>{helper.name} - {helper.skills.join(", ")}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </main>
      </div>
    </div>
  );
};

export default Map;
