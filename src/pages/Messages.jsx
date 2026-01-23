import React, { useState, useEffect, useRef, useCallback } from "react";
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
  MessageSquare,
  Image,
  Mic,
  ThumbsUp,
  Calendar,
  FileText,
  Download,
  Filter,
  Check,
} from "lucide-react";

export default function Messages() {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messageText, setMessageText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredConversations, setFilteredConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [showMobileList, setShowMobileList] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

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
      isPinned: true,
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
      isPinned: false,
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
      isPinned: true,
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
      isPinned: false,
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
      isPinned: false,
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
      isPinned: false,
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
        attachments: [
          { type: "pdf", name: "Lab_Report.pdf", size: "2.4 MB" },
          { type: "image", name: "prescription.jpg", size: "1.2 MB" },
        ],
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

  // Emojis for quick reactions
  const quickEmojis = ["👍", "❤️", "😂", "😮", "😢", "🙏"];

  // Attachment options
  const attachmentOptions = [
    {
      icon: <Image className="w-5 h-5" />,
      label: "Photo & Video",
      color: "text-blue-500",
    },
    {
      icon: <FileText className="w-5 h-5" />,
      label: "Document",
      color: "text-green-500",
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      label: "Appointment",
      color: "text-purple-500",
    },
  ];

  // Filter options
  const filterOptions = [
    { id: "all", label: "All" },
    { id: "unread", label: "Unread" },
    { id: "pinned", label: "Pinned" },
    { id: "doctor", label: "Doctors" },
  ];

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
    const filtered = conversations.filter((conv) => {
      // Filter by search term
      if (
        searchTerm &&
        !conv.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }

      // Apply active filter
      if (activeFilter !== "all") {
        if (activeFilter === "unread") {
          return conv.unread > 0;
        } else if (activeFilter === "pinned") {
          return conv.isPinned;
        } else {
          return conv.type === activeFilter;
        }
      }

      return true;
    });

    setFilteredConversations(filtered);
  }, [searchTerm, conversations, activeFilter]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSelectConversation = useCallback((conversation) => {
    setSelectedConversation(conversation);
    setMessages(mockMessages[conversation.id] || []);

    // Mark as read
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === conversation.id ? { ...conv, unread: 0 } : conv,
      ),
    );

    // Auto hide conversation list on mobile
    if (window.innerWidth < 768) {
      setShowMobileList(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSendMessage = useCallback(
    (e) => {
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

      // Simulate typing indicator
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        // Simulate auto-reply
        if (
          selectedConversation.type === "doctor" ||
          selectedConversation.type === "bot"
        ) {
          setTimeout(() => {
            const autoReply = {
              id: messages.length + 2,
              sender: selectedConversation.name,
              senderType: selectedConversation.type,
              avatar: selectedConversation.avatar,
              text: "Thank you for your message. I'll get back to you soon.",
              timestamp: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
              isOwn: false,
            };
            setMessages((prev) => [...prev, autoReply]);
          }, 1500);
        }
      }, 1000);
    },
    [messageText, selectedConversation, messages],
  );

  const handleQuickEmoji = useCallback(
    (emoji) => {
      if (!selectedConversation) return;

      const emojiMessage = {
        id: messages.length + 1,
        sender: "You",
        senderType: "patient",
        text: emoji,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isOwn: true,
        isEmoji: true,
      };

      setMessages([...messages, emojiMessage]);
    },
    [selectedConversation, messages],
  );

  const handleFileUpload = useCallback(
    (type) => {
      if (type === "image" || type === "document") {
        fileInputRef.current.click();
      } else if (type === "appointment") {
        // Handle appointment creation
        const appointmentMessage = {
          id: messages.length + 1,
          sender: "You",
          senderType: "patient",
          text: "📅 I'd like to schedule an appointment",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          isOwn: true,
          isAppointment: true,
        };
        setMessages([...messages, appointmentMessage]);
        setShowAttachmentMenu(false);
      }
    },
    [messages],
  );

  const getBadgeColor = useCallback((type) => {
    const colors = {
      doctor: "bg-blue-100 text-blue-700 border border-blue-200",
      clinic: "bg-green-100 text-green-700 border border-green-200",
      bot: "bg-purple-100 text-purple-700 border border-purple-200",
      patient: "bg-orange-100 text-orange-700 border border-orange-200",
    };
    return colors[type] || "bg-gray-100 text-gray-700 border border-gray-200";
  }, []);

  const getFileIcon = useCallback((type) => {
    switch (type) {
      case "pdf":
        return <FileText className="w-5 h-5 text-red-500" />;
      case "image":
        return <Image className="w-5 h-5 text-blue-500" />;
      default:
        return <FileText className="w-5 h-5 text-gray-500" />;
    }
  }, []);

  // Responsive breakpoint check
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setShowMobileList(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-blue-50 flex">
  

      {/* Conversations List */}
      <div
        className={`fixed md:relative inset-y-0 left-0 z-50 md:z-auto w-full md:w-96 lg:w-80 xl:w-96 bg-white/95 md:bg-white backdrop-blur-sm md:backdrop-blur-none border-r border-gray-200 flex flex-col transform transition-transform duration-300 ease-in-out ${
          showMobileList ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {/* Header */}
        <div className="p-4 md:p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl md:text-3xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Messages
            </h1>
            <button
              onClick={() => setShowMobileList(false)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
            {filterOptions.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                  activeFilter === filter.id
                    ? "bg-blue-500 text-white shadow-sm"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {filter.label}
                {activeFilter === filter.id && <Check className="w-3 h-3" />}
              </button>
            ))}
          </div>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto p-2 md:p-4">
          {filteredConversations.length === 0 ? (
            <div className="text-center py-8">
              <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">
                No conversations found
              </p>
              <p className="text-gray-400 text-sm">
                Try adjusting your search or filter
              </p>
            </div>
          ) : (
            filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => handleSelectConversation(conversation)}
                className={`p-3 mb-2 rounded-xl cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-md ${
                  selectedConversation?.id === conversation.id
                    ? "bg-linear-to-r from-blue-50 to-indigo-50 border-2 border-blue-200"
                    : "bg-white hover:bg-gray-50 border border-gray-100"
                }`}
              >
                <div className="flex gap-3">
                  {/* Avatar */}
                  <div className="relative shrink-0">
                    <div className="relative">
                      <img
                        src={conversation.avatar}
                        alt={conversation.name}
                        className="w-12 h-12 rounded-xl object-cover border-2 border-white shadow-sm"
                      />
                      {conversation.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    {conversation.isPinned && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-800 truncate text-sm md:text-base">
                        {conversation.name}
                      </h3>
                      {conversation.unread > 0 && (
                        <span className="bg-linear-to-r from-blue-500 to-purple-500 text-white text-xs font-semibold rounded-full w-6 h-6 flex items-center justify-center shadow-sm">
                          {conversation.unread}
                        </span>
                      )}
                    </div>

                    <p className="text-sm text-gray-600 truncate mb-1">
                      {conversation.lastMessage}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 font-medium">
                        {conversation.timestamp}
                      </span>
                      <div className="flex items-center gap-2">
                        {conversation.type && (
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${getBadgeColor(
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
              </div>
            ))
          )}
        </div>

        {/* User Profile Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50/50">
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
              alt="User"
              className="w-10 h-10 rounded-xl object-cover border-2 border-white shadow-sm"
            />
            <div className="flex-1">
              <p className="font-semibold text-gray-800 text-sm">You</p>
              <p className="text-xs text-gray-500">Patient</p>
            </div>
            <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-white/50 backdrop-blur-sm md:backdrop-blur-none">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-200">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <button
                    onClick={() => setShowMobileList(true)}
                    className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <Menu className="w-6 h-6" />
                  </button>
                  <div className="relative">
                    <div className="relative">
                      <img
                        src={selectedConversation.avatar}
                        alt={selectedConversation.name}
                        className="w-12 h-12 rounded-xl object-cover border-2 border-white shadow-sm"
                      />
                      {selectedConversation.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="font-bold text-gray-800 text-lg">
                      {selectedConversation.name}
                    </h2>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${selectedConversation.online ? "bg-green-500 animate-pulse" : "bg-gray-400"}`}
                      ></div>
                      <p className="text-sm text-gray-600">
                        {selectedConversation.online ? (
                          <span className="flex items-center gap-1">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            Active now
                          </span>
                        ) : (
                          "Last seen recently"
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-1 md:gap-2">
                  <button className="p-2 md:p-3 hover:bg-blue-50 rounded-xl transition-colors group">
                    <Phone className="w-5 h-5 md:w-6 md:h-6 text-blue-600 group-hover:scale-110 transition-transform" />
                  </button>
                  <button className="p-2 md:p-3 hover:bg-blue-50 rounded-xl transition-colors group">
                    <Video className="w-5 h-5 md:w-6 md:h-6 text-blue-600 group-hover:scale-110 transition-transform" />
                  </button>
                  <button className="p-2 md:p-3 hover:bg-gray-100 rounded-xl transition-colors">
                    <Info className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 bg-linear-to-b from-white to-gray-50/50">
              {/* Date Separator */}
              <div className="flex items-center justify-center my-6">
                <div className="px-4 py-2 bg-gray-100 rounded-full">
                  <span className="text-xs font-medium text-gray-600">
                    Today
                  </span>
                </div>
              </div>

              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isOwn ? "justify-end" : "justify-start"} animate-fade-in`}
                >
                  <div
                    className={`flex gap-3 max-w-xs md:max-w-md lg:max-w-lg ${
                      message.isOwn ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    {!message.isOwn && (
                      <img
                        src={message.avatar}
                        alt={message.sender}
                        className="w-10 h-10 rounded-xl object-cover border-2 border-white shadow-sm shrink-0"
                      />
                    )}
                    <div className="flex flex-col">
                      {!message.isOwn && (
                        <span className="text-xs font-medium text-gray-600 mb-1 ml-1">
                          {message.sender}
                        </span>
                      )}
                      <div className="flex flex-col gap-2">
                        <div
                          className={`px-4 py-3 rounded-2xl ${
                            message.isOwn
                              ? "bg-linear-to-r from-blue-500 to-purple-500 text-white rounded-br-none shadow-sm"
                              : "bg-gray-100 text-gray-800 rounded-bl-none shadow-sm"
                          } ${message.isEmoji ? "text-2xl p-2" : ""}`}
                        >
                          <p
                            className={`wrap-break-words ${message.isEmoji ? "text-3xl" : ""}`}
                          >
                            {message.text}
                          </p>
                        </div>

                        {/* Attachments */}
                        {message.attachments && (
                          <div
                            className={`flex flex-col gap-2 ${message.isOwn ? "items-end" : "items-start"}`}
                          >
                            {message.attachments.map((file, idx) => (
                              <div
                                key={idx}
                                className={`flex items-center gap-3 p-3 rounded-xl border ${
                                  message.isOwn
                                    ? "bg-white border-blue-200"
                                    : "bg-gray-50 border-gray-200"
                                }`}
                              >
                                {getFileIcon(file.type)}
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-800 truncate">
                                    {file.name}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {file.size}
                                  </p>
                                </div>
                                <button className="p-2 hover:bg-gray-100 rounded-lg">
                                  <Download className="w-4 h-4 text-gray-600" />
                                </button>
                              </div>
                            ))}
                          </div>
                        )}

                        <span
                          className={`text-xs text-gray-500 ${message.isOwn ? "text-right" : "text-left"}`}
                        >
                          {message.timestamp}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start animate-fade-in">
                  <div className="flex gap-3">
                    <img
                      src={selectedConversation.avatar}
                      alt={selectedConversation.name}
                      className="w-10 h-10 rounded-xl object-cover border-2 border-white shadow-sm"
                    />
                    <div className="flex flex-col">
                      <span className="text-xs font-medium text-gray-600 mb-1">
                        {selectedConversation.name}
                      </span>
                      <div className="px-4 py-3 bg-gray-100 rounded-2xl rounded-bl-none">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Reactions */}
            <div className="px-4 py-2 bg-white border-t border-gray-200">
              <div className="flex items-center justify-center gap-2">
                {quickEmojis.map((emoji, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickEmoji(emoji)}
                    className="p-2 hover:bg-gray-100 rounded-xl text-lg transition-all hover:scale-110 active:scale-95"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <form
              onSubmit={handleSendMessage}
              className="sticky bottom-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 p-4"
            >
              <div className="flex gap-2 items-end">
                {/* Attachment Menu */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
                    className="p-3 hover:bg-blue-50 rounded-xl transition-colors group"
                  >
                    <Paperclip className="w-5 h-5 text-blue-600 group-hover:rotate-12 transition-transform" />
                  </button>

                  {showAttachmentMenu && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setShowAttachmentMenu(false)}
                      />
                      <div className="absolute bottom-14 left-0 z-20 bg-white rounded-xl shadow-lg border border-gray-200 p-2 min-w-[200px] animate-slide-up">
                        {attachmentOptions.map((option, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() =>
                              handleFileUpload(option.label.toLowerCase())
                            }
                            className="flex items-center gap-3 w-full p-3 hover:bg-gray-50 rounded-lg transition-colors"
                          >
                            <div className={option.color}>{option.icon}</div>
                            <span className="text-sm font-medium text-gray-700">
                              {option.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* Hidden file input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*,.pdf,.doc,.docx"
                  onChange={(e) => {
                    if (e.target.files[0]) {
                      const fileMessage = {
                        id: messages.length + 1,
                        sender: "You",
                        senderType: "patient",
                        text: `📎 ${e.target.files[0].name}`,
                        timestamp: new Date().toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        }),
                        isOwn: true,
                        isFile: true,
                      };
                      setMessages([...messages, fileMessage]);
                    }
                  }}
                />

                {/* Message Input */}
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Type your message here..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                    onFocus={() => setShowEmojiPicker(false)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-lg"
                  >
                    <Smile className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                {/* Send Button */}
                <button
                  type="submit"
                  disabled={!messageText.trim()}
                  className={`p-3 rounded-xl transition-all duration-200 flex items-center justify-center ${
                    messageText.trim()
                      ? "bg-linear-to-r from-blue-500 to-purple-500 text-white shadow-sm hover:shadow-md hover:scale-105"
                      : "bg-gray-200 text-gray-400"
                  }`}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </>
        ) : (
          // Empty State
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="text-center max-w-md">
              <div className="w-20 h-20 bg-linear-to-r from-blue-100 to-purple-100 rounded-2xl mx-auto mb-6 flex items-center justify-center">
                <MessageSquare className="w-10 h-10 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Welcome to Messages
              </h3>
              <p className="text-gray-600 mb-6">
                Select a conversation to start messaging. You can also search
                for specific conversations or filter by type.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <button className="p-3 bg-blue-50 text-blue-600 rounded-xl font-medium hover:bg-blue-100 transition-colors">
                  <Phone className="w-5 h-5 inline mr-2" />
                  Start Call
                </button>
                <button className="p-3 bg-purple-50 text-purple-600 rounded-xl font-medium hover:bg-purple-100 transition-colors">
                  <Video className="w-5 h-5 inline mr-2" />
                  Video Call
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.2s ease-out;
        }

        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }

        .wrap-break-words {
          word-wrap: break-word;
          overflow-wrap: break-word;
        }
      `}</style>
    </div>
  );
}
