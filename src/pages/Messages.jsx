import React, { useState, useEffect, useRef } from "react";
import {
  Send,
  Search,
  MoreVertical,
  Phone,
  Video,
  Info,
  Smile,
  Paperclip,
  X,
  Menu,
  ChevronLeft,
} from "lucide-react";

export default function Messages() {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messageText, setMessageText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredConversations, setFilteredConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [showMobileList, setShowMobileList] = useState(true);
  const messagesEndRef = useRef(null);

  // Mock conversations data
  const mockConversations = [
    {
      id: 1,
      name: "Dr. Rajesh Kumar",
      avatar:
        "https://images.unsplash.com/photo-1622496131280-9b5f0a0c19ad?w=100&h=100&fit=crop",
      lastMessage:
        "The prescription has been updated. Please check your reports.",
      timestamp: "2 min ago",
      unread: 2,
      online: true,
      type: "doctor",
      speciality: "General Medicine",
    },
    {
      id: 2,
      name: "Priya Sharma",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      lastMessage: "Thank you! I will follow up next week",
      timestamp: "15 min ago",
      unread: 0,
      online: true,
      type: "patient",
    },
    {
      id: 3,
      name: "City Medical Center",
      avatar:
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=100&h=100&fit=crop",
      lastMessage: "Your appointment is confirmed for tomorrow at 10:00 AM",
      timestamp: "1 hour ago",
      unread: 1,
      online: false,
      type: "clinic",
    },
    {
      id: 4,
      name: "Dr. Priya Verma",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      lastMessage: "Get well soon! Take rest and stay hydrated.",
      timestamp: "3 hours ago",
      unread: 0,
      online: false,
      type: "doctor",
      speciality: "Cardiology",
    },
    {
      id: 5,
      name: "Health Assistant",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      lastMessage: "Your medication reminder for today",
      timestamp: "5 hours ago",
      unread: 0,
      online: true,
      type: "bot",
    },
    {
      id: 6,
      name: "Amit Singh",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      lastMessage: "Hi, how are you feeling now?",
      timestamp: "Yesterday",
      unread: 0,
      online: false,
      type: "patient",
    },
  ];

  // Mock messages for each conversation
  const mockMessages = {
    1: [
      {
        id: 1,
        sender: "Dr. Rajesh Kumar",
        senderType: "doctor",
        avatar:
          "https://images.unsplash.com/photo-1622496131280-9b5f0a0c19ad?w=100&h=100&fit=crop",
        text: "Hello! How are you feeling today?",
        timestamp: "10:30 AM",
        isOwn: false,
      },
      {
        id: 2,
        sender: "You",
        senderType: "patient",
        text: "I'm doing better, thank you for asking doctor.",
        timestamp: "10:32 AM",
        isOwn: true,
      },
      {
        id: 3,
        sender: "Dr. Rajesh Kumar",
        senderType: "doctor",
        avatar:
          "https://images.unsplash.com/photo-1622496131280-9b5f0a0c19ad?w=100&h=100&fit=crop",
        text: "That's great to hear! Make sure to take your medications on time.",
        timestamp: "10:35 AM",
        isOwn: false,
      },
      {
        id: 4,
        sender: "You",
        senderType: "patient",
        text: "Yes, I'm taking them regularly. When should I come for the follow-up?",
        timestamp: "10:37 AM",
        isOwn: true,
      },
      {
        id: 5,
        sender: "Dr. Rajesh Kumar",
        senderType: "doctor",
        avatar:
          "https://images.unsplash.com/photo-1622496131280-9b5f0a0c19ad?w=100&h=100&fit=crop",
        text: "The prescription has been updated. Please check your reports.",
        timestamp: "10:40 AM",
        isOwn: false,
      },
    ],
    2: [
      {
        id: 1,
        sender: "Priya Sharma",
        senderType: "patient",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
        text: "Hi! I had a question about the test results",
        timestamp: "Yesterday",
        isOwn: false,
      },
      {
        id: 2,
        sender: "You",
        senderType: "patient",
        text: "Sure, go ahead. What would you like to know?",
        timestamp: "Yesterday",
        isOwn: true,
      },
      {
        id: 3,
        sender: "Priya Sharma",
        senderType: "patient",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
        text: "Are these values normal? I'm a bit concerned.",
        timestamp: "Today 9:00 AM",
        isOwn: false,
      },
      {
        id: 4,
        sender: "You",
        senderType: "patient",
        text: "Yes, they are within normal range. You should be fine. Consult your doctor if you're still worried.",
        timestamp: "Today 9:15 AM",
        isOwn: true,
      },
      {
        id: 5,
        sender: "Priya Sharma",
        senderType: "patient",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
        text: "Thank you! I will follow up next week",
        timestamp: "Today 9:30 AM",
        isOwn: false,
      },
    ],
  };

  useEffect(() => {
    // Initialize conversations on mount
    setConversations(mockConversations);
    setFilteredConversations(mockConversations);
    if (mockConversations.length > 0) {
      setSelectedConversation(mockConversations[0]);
      setMessages(mockMessages[mockConversations[0].id] || []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let filtered = [...conversations];
    if (searchTerm) {
      filtered = filtered.filter(
        (conv) =>
          conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }
    setFilteredConversations(filtered);
  }, [searchTerm, conversations]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    setMessages(mockMessages[conversation.id] || []);
    setShowMobileList(false);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageText.trim() || !selectedConversation) return;

    const newMessage = {
      id: messages.length + 1,
      sender: "You",
      senderType: "patient",
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isOwn: true,
    };

    setMessages([...messages, newMessage]);
    setMessageText("");
  };

  const getBadgeColor = (type) => {
    switch (type) {
      case "doctor":
        return "bg-blue-100 text-blue-700";
      case "clinic":
        return "bg-green-100 text-green-700";
      case "bot":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Conversations List */}
      <div
        className={`${
          showMobileList ? "block" : "hidden"
        } md:block w-full md:w-80 bg-white border-r border-gray-200 flex flex-col`}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Messages</h1>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => handleSelectConversation(conversation)}
              className={`p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedConversation?.id === conversation.id ? "bg-blue-50" : ""
              }`}
            >
              <div className="flex gap-3">
                {/* Avatar */}
                <div className="relative shrink-0">
                  <img
                    src={conversation.avatar}
                    alt={conversation.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {conversation.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-800 truncate">
                      {conversation.name}
                    </h3>
                    {conversation.unread > 0 && (
                      <span className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {conversation.unread}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-gray-600 truncate">
                    {conversation.lastMessage}
                  </p>

                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-500">
                      {conversation.timestamp}
                    </span>
                    {conversation.type && (
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${getBadgeColor(
                          conversation.type,
                        )}`}
                      >
                        {conversation.type}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white sticky top-0 z-10">
              <div className="flex items-center gap-3 flex-1">
                <button
                  onClick={() => setShowMobileList(true)}
                  className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <div className="relative">
                  <img
                    src={selectedConversation.avatar}
                    alt={selectedConversation.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  {selectedConversation.online && (
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div>
                  <h2 className="font-semibold text-gray-800">
                    {selectedConversation.name}
                  </h2>
                  <p className="text-xs text-gray-500">
                    {selectedConversation.online ? "Active now" : "Offline"}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Phone className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Video className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Info className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <MoreVertical className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex gap-2 max-w-xs ${
                      message.isOwn ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    {!message.isOwn && (
                      <img
                        src={message.avatar}
                        alt={message.sender}
                        className="w-8 h-8 rounded-full object-cover shrink-0"
                      />
                    )}
                    <div>
                      <div
                        className={`px-4 py-2 rounded-lg ${
                          message.isOwn
                            ? "bg-blue-500 text-white rounded-br-none"
                            : "bg-gray-200 text-gray-800 rounded-bl-none"
                        }`}
                      >
                        <p className="wrap-break-words">{message.text}</p>
                      </div>
                      <span
                        className={`text-xs text-gray-500 mt-1 block ${
                          message.isOwn ? "text-right" : "text-left"
                        }`}
                      >
                        {message.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form
              onSubmit={handleSendMessage}
              className="p-4 border-t border-gray-200 bg-white"
            >
              <div className="flex gap-3 items-end">
                <button
                  type="button"
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Paperclip className="w-5 h-5 text-gray-600" />
                </button>

                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Type a message..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-lg"
                  >
                    <Smile className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={!messageText.trim()}
                  className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed shrink-0"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <MessageSquare className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-600 font-semibold">
                No conversation selected
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Choose a conversation to start messaging
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import { MessageSquare } from "lucide-react";
