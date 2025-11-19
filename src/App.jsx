import React, { useState } from "react";

function App() {
  const [activePage, setActivePage] = useState("home");

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-blue-600">LifeNet</span>
          <span className="hidden sm:inline text-sm text-gray-500">
            Real-Time Life Assistant Network
          </span>
        </div>
        <nav className="flex gap-4">
          <button
            className={`font-medium px-2 py-1 rounded ${activePage === "home" ? "bg-blue-100 text-blue-700" : ""}`}
            onClick={() => setActivePage("home")}
          >
            Home
          </button>
          <button
            className={`font-medium px-2 py-1 rounded ${activePage === "map" ? "bg-blue-100 text-blue-700" : ""}`}
            onClick={() => setActivePage("map")}
          >
            Map
          </button>
          <button
            className={`font-medium px-2 py-1 rounded ${activePage === "new_post" ? "bg-blue-100 text-blue-700" : ""}`}
            onClick={() => setActivePage("new_post")}
          >
            New Post
          </button>
          <button
            className={`font-medium px-2 py-1 rounded ${activePage === "chat" ? "bg-blue-100 text-blue-700" : ""}`}
            onClick={() => setActivePage("chat")}
          >
            Chat
          </button>
          <button
            className={`font-medium px-2 py-1 rounded ${activePage === "profile" ? "bg-blue-100 text-blue-700" : ""}`}
            onClick={() => setActivePage("profile")}
          >
            Profile
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex px-4 py-6 max-w-6xl mx-auto w-full">
        {activePage === "home" && <HomeFeed />}
        {activePage === "map" && <MapView />}
        {activePage === "new_post" && <PostCreation />}
        {activePage === "chat" && <ChatInterface />}
        {activePage === "profile" && <ProfilePage />}
      </main>

      {/* Footer */}
      <footer className="py-3 px-6 bg-white shadow-inner text-center text-xs text-gray-400">
        &copy; {new Date().getFullYear()} LifeNet - Real-Time Life Assistant Network
      </footer>
    </div>
  );
}

// --- HomeFeed ---
function HomeFeed() {
  // Example posts for demonstration
  const demoPosts = [
    {
      id: 1,
      user: "Ravi S.",
      time: "2m ago",
      category: "Health",
      type: "Question",
      text: "What should I do if I’ve got a mild fever and headache?",
      reputation: 48,
      location: "Near you",
      status: "Open",
    },
    {
      id: 2,
      user: "Li Wei",
      time: "4m ago",
      category: "Travel",
      type: "Need",
      text: "Urgent: Lost passport at train station, looking for help.",
      reputation: 121,
      location: "3 km",
      status: "Alert",
    },
  ];

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Live Feed</h2>
      <div className="flex flex-col gap-4">
        {demoPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-xl shadow p-4 flex flex-col md:flex-row md:items-center gap-2 border-l-4"
            style={{
              borderColor:
                post.category === "Health"
                  ? "#f87171"
                  : post.category === "Travel"
                  ? "#34d399"
                  : "#3b82f6",
            }}
          >
            <div className="flex-1">
              <div className="text-sm flex items-center gap-2 mb-1">
                <span className="font-bold text-gray-800">{post.user}</span>
                <span className="text-gray-400">· {post.time}</span>
                <span
                  className={
                    "ml-2 text-xs px-2 py-0.5 rounded font-medium " +
                    (post.category === "Health"
                      ? "bg-red-100 text-red-600"
                      : post.category === "Travel"
                      ? "bg-green-100 text-green-700"
                      : "bg-blue-100 text-blue-700")
                  }
                >
                  {post.category}
                </span>
                {post.status === "Alert" && (
                  <span className="ml-2 text-xs px-2 bg-yellow-100 text-yellow-800 rounded">
                    🚨 Alert
                  </span>
                )}
              </div>
              <div className="text-base text-gray-900">{post.text}</div>
            </div>
            <div className="flex flex-col items-end gap-1 min-w-[100px]">
              <span className="text-xs text-gray-400">{post.location}</span>
              <span className="text-xs text-blue-500">
                Rep: {post.reputation}
              </span>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-1 rounded text-xs mt-2 md:mt-0">
                Respond
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 text-center">
        <span className="text-gray-400 text-sm">
          More posts appear here in real time!
        </span>
      </div>
    </section>
  );
}

// --- MapView ---
function MapView() {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Map of Helpers & Issues</h2>
      <div className="flex flex-col items-center py-8">
        <div className="w-full h-64 bg-gray-100 flex items-center justify-center rounded-xl">
          <span className="text-gray-400">[Map integration coming soon]</span>
        </div>
        <div className="mt-4 text-sm text-gray-600 text-center">
          View local posts, urgent alerts, and skilled helpers near you.
        </div>
      </div>
    </section>
  );
}

// --- PostCreation ---
function PostCreation() {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("Question");

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Create a New Post</h2>
      <form
        className="bg-white rounded-xl shadow p-6 flex flex-col gap-4"
        onSubmit={e => {
          e.preventDefault();
          alert("Post submitted! (Demo only)");
        }}
      >
        <div>
          <label className="block font-medium text-gray-700 mb-1">Type</label>
          <select
            className="border rounded w-full p-2"
            value={type}
            onChange={e => setType(e.target.value)}
          >
            <option>Question</option>
            <option>Need</option>
            <option>Emergency</option>
          </select>
        </div>
        <div>
          <label className="block font-medium text-gray-700 mb-1">Category</label>
          <select
            className="border rounded w-full p-2"
            value={category}
            onChange={e => setCategory(e.target.value)}
            required
          >
            <option value="">Select...</option>
            <option>Health</option>
            <option>Study</option>
            <option>Travel</option>
            <option>Finance</option>
            <option>Technology</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label className="block font-medium text-gray-700 mb-1">Description</label>
          <textarea
            className="border rounded w-full p-2"
            placeholder="Describe your question, need, or emergency..."
            value={text}
            onChange={e => setText(e.target.value)}
            required
          />
        </div>
        {/* Media upload & voice input could go here */}
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
          type="submit"
        >
          Submit
        </button>
      </form>
    </section>
  );
}

// --- ChatInterface ---
function ChatInterface() {
  // Demo state for a chat
  const [messages, setMessages] = useState([
    { from: "You", text: "Hi! Can anyone help with fever remedies?", time: "Now" },
    { from: "Helper Anna", text: "Sure! Have you checked your temperature?", time: "Just now" },
  ]);
  const [input, setInput] = useState("");

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Live Chat</h2>
      <div className="bg-white rounded-xl shadow p-4 flex flex-col h-80">
        <div className="flex-1 overflow-y-auto mb-2">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`mb-2 flex ${msg.from === "You" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-3 py-1.5 rounded-lg max-w-xl ${
                  msg.from === "You"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                <div className="text-xs font-bold mb-0.5">{msg.from}</div>
                <div>{msg.text}</div>
                <div className="text-[10px] text-gray-400 text-right mt-1">{msg.time}</div>
              </div>
            </div>
          ))}
        </div>
        <form
          className="flex gap-2"
          onSubmit={e => {
            e.preventDefault();
            if (input.trim() === "") return;
            setMessages([
              ...messages,
              { from: "You", text: input, time: "Now" },
            ]);
            setInput("");
          }}
        >
          <input
            className="border rounded p-2 flex-1"
            type="text"
            placeholder="Type your message…"
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 rounded"
          >
            Send
          </button>
        </form>
      </div>
    </section>
  );
}

// --- ProfilePage ---
function ProfilePage() {
  // Example user data
  const user = {
    name: "Bibas Gautam",
    email: "bibas@email.com",
    location: "Kathmandu, Nepal",
    skills: ["Health", "Technology", "Travel"],
    reputation: 87,
    role: "Helper User",
  };

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
      <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-3 max-w-md">
        <div className="flex items-center gap-4">
          <div className="bg-blue-200 rounded-full w-16 h-16 flex items-center justify-center font-extrabold text-blue-600 text-2xl">
            {user.name[0]}
          </div>
          <div>
            <div className="text-lg font-bold">{user.name}</div>
            <div className="text-xs text-gray-400">{user.email}</div>
            <div className="text-xs">{user.location}</div>
          </div>
        </div>
        <div>
          <span className="font-medium">Skills: </span>
          <span>{user.skills.join(", ")}</span>
        </div>
        <div>
          <span className="font-medium">Reputation: </span>
          <span className="text-blue-600 font-bold">{user.reputation}</span>
        </div>
        <div>
          <span className="font-medium">Role: </span>
          <span className="text-sm">{user.role}</span>
        </div>
        <button className="mt-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded px-3 py-1 text-xs">
          Edit Profile
        </button>
      </div>
    </section>
  );
}

export default App;
