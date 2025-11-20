// src/pages/ChatPage.jsx
import React, { useEffect, useState } from "react";
import Navbar from "../components/Shared/Navbar";
import Sidebar from "../components/Home/Sidebar";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000");

const Chat = () => {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const fetchConversations = async () => {
      const res = await axios.get("/api/chat/conversations");
      setConversations(res.data);
    };
    fetchConversations();

    socket.on("receiveMessage", (msg) => {
      if (currentChat && msg.sender === currentChat._id) {
        setMessages((prev) => [...prev, msg]);
      }
    });
  }, [currentChat]);

  const handleSend = async () => {
    const message = { content: newMessage, receiver: currentChat._id };
    socket.emit("sendMessage", message);
    await axios.post("/api/chat/send", message);
    setMessages((prev) => [...prev, message]);
    setNewMessage("");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 flex gap-4">
          {/* Conversations List */}
          <div className="w-1/3 bg-white shadow-md rounded p-4">
            <h2 className="font-bold mb-2">Conversations</h2>
            {conversations.map((c) => (
              <div
                key={c._id}
                className="p-2 cursor-pointer hover:bg-gray-100 rounded"
                onClick={() => {
                  setCurrentChat(c);
                  setMessages(c.messages);
                }}
              >
                {c.name}
              </div>
            ))}
          </div>

          {/* Chat Thread */}
          <div className="flex-1 flex flex-col bg-white shadow-md rounded p-4">
            {currentChat ? (
              <>
                <div className="flex-1 overflow-y-auto space-y-2">
                  {messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`p-2 rounded ${
                        msg.sender === "me" ? "bg-blue-100 self-end" : "bg-gray-200"
                      }`}
                    >
                      {msg.content}
                    </div>
                  ))}
                </div>
                <div className="mt-2 flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 border rounded px-2 py-1 focus:outline-none focus:ring"
                  />
                  <button
                    onClick={handleSend}
                    className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                  >
                    Send
                  </button>
                </div>
              </>
            ) : (
              <div>Select a conversation</div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Chat;
