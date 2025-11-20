// src/pages/ProfilePage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Shared/Navbar";
import Sidebar from "../components/Home/Sidebar";
import axios from "axios";

const Profile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/api/users/${userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [userId]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="bg-white shadow-md p-6 rounded space-y-4">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p>Reputation: {user.reputationScore}</p>
            <p>Skills: {user.skills.join(", ")}</p>
            <h2 className="font-bold mt-4">Posts</h2>
            <ul>
              {user.posts.map((p) => (
                <li key={p._id} className="border-b py-2">{p.text}</li>
              ))}
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
