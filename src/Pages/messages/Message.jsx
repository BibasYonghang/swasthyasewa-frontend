import { useState, useEffect, useRef } from "react";

export default function Message() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      fromMe: false,
      text: "Hey! What’s up?",
      time: "10:20 AM",
    },
    {
      id: 2,
      fromMe: true,
      text: "All good bro, working on the project.",
      time: "10:22 AM",
    },
    {
      id: 3,
      fromMe: false,
      text: "Nice! Need any help?",
      time: "10:23 AM",
    },
  ]);

  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  // Scroll to bottom when new messages come
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMsg = {
      id: Date.now(),
      fromMe: true,
      text: input.trim(),
      time: "Just now",
    };

    setMessages([...messages, newMsg]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="p-4 border-b flex items-center gap-3">
        <img
          src="https://i.pravatar.cc/150?img=1"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <h2 className="font-semibold">Bibas Yonghang</h2>
          <p className="text-sm text-gray-500">Active now</p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.fromMe ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`
                max-w-[70%] p-3 rounded-xl text-sm 
                ${
                  msg.fromMe
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-white text-gray-900 border rounded-bl-none"
                }
              `}
            >
              <p>{msg.text}</p>
              <span className="text-[10px] text-gray-300 block text-right mt-1">
                {msg.time}
              </span>
            </div>
          </div>
        ))}

        <div ref={bottomRef}></div>
      </div>

      {/* Message Input */}
      <div className="p-3 border-t bg-white flex items-center gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 p-2 bg-gray-100 rounded-full focus:outline-none"
        />

        <button
          onClick={sendMessage}
          className="px-4 py-2 bg-blue-500 text-white rounded-full"
        >
          Send
        </button>
      </div>
    </div>
  );
}
