import { useState, useEffect, useRef } from "react";
import { useData } from "../context/DataProvider";
import axios from "axios";
import { io } from "socket.io-client";
import toast from "react-hot-toast";

const baseUrl = import.meta.env.VITE_BACKEND_URL;
const socket = io(baseUrl);

function Chat() {
    const baseUrl = import.meta.env.VITE_BACKEND_URL;
    const { user } = useData();
    const [conversations, setConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [typing, setTyping] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [editingMessage, setEditingMessage] = useState(null);

    const messagesEndRef = useRef(null);
    const typingTimeoutRef = useRef(null);
    const fileInputRef = useRef(null);

    // Connect seller to socket
    useEffect(() => {
        if (user?._id) {
            socket.emit("addUser", user._id);
        }
        socket.on("getOnlineUsers", (users) => setOnlineUsers(users));

        return () => {
            socket.off("getOnlineUsers");
        };
    }, [user]);

    // Listen for incoming messages and updates
    useEffect(() => {
        const handleMessage = (message) => {
            if (
                selectedConversation &&
                message.conversationId === selectedConversation._id
            ) {
                if (message.senderId !== user?._id) {
                    setMessages((prev) => {
                        if (prev.find(m => m._id?.toString() === message._id?.toString())) return prev;
                        return [...prev, message];
                    });
                }
            }
            // Update last message in conversation list
            setConversations((prev) =>
                prev.map((conv) =>
                    conv._id === message.conversationId
                        ? { ...conv, lastMessage: message.message, lastMessageTime: Date.now(), unreadSeller: conv._id !== selectedConversation?._id ? (conv.unreadSeller || 0) + 1 : 0 }
                        : conv
                )
            );
        };

        const handleMessageSent = (message) => {
            if (selectedConversation && message.conversationId === selectedConversation._id) {
                setMessages((prev) => {
                    const withoutTemp = prev.filter(m => typeof m._id !== "number");
                    if (withoutTemp.find(m => m._id?.toString() === message._id?.toString())) return withoutTemp;
                    return [...withoutTemp, message];
                });
            }
        };

        const handleMessageDeleted = ({ messageId }) => {
            setMessages((prev) => prev.filter(m => m._id !== messageId));
        };

        const handleMessageEdited = ({ messageId, newMessage }) => {
            setMessages((prev) => prev.map(m => m._id === messageId ? { ...m, message: newMessage } : m));
        };

        socket.on("receiveMessage", handleMessage);
        socket.on("messageSent", handleMessageSent);
        socket.on("messageDeleted", handleMessageDeleted);
        socket.on("messageEdited", handleMessageEdited);

        socket.on("userTyping", ({ conversationId, senderId }) => {
            if (selectedConversation?._id === conversationId && senderId !== user?._id) {
                setIsTyping(true);
            }
        });

        socket.on("userStopTyping", ({ conversationId, senderId }) => {
            if (selectedConversation?._id === conversationId && senderId !== user?._id) {
                setIsTyping(false);
            }
        });

        return () => {
            socket.off("receiveMessage", handleMessage);
            socket.off("messageSent", handleMessageSent);
            socket.off("messageDeleted", handleMessageDeleted);
            socket.off("messageEdited", handleMessageEdited);
            socket.off("userTyping");
            socket.off("userStopTyping");
        };
    }, [selectedConversation?._id, user?._id]);

    // Scroll to bottom on new message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Fetch all seller conversations
    useEffect(() => {
        if (user?._id) {
            fetchConversations();
        }
    }, [user]);

    const fetchConversations = async () => {
        try {
            const res = await axios.get(
                `${baseUrl}/api/chat/getSellerConversations/${user._id}`
            );
            setConversations(res.data.data);
        } catch (err) {
            console.log("Fetch Conversations Error:", err);
        }
    };

    const openConversation = async (conversation) => {
        setSelectedConversation(conversation);
        try {
            // Fetch messages
            const res = await axios.get(
                `${baseUrl}/api/chat/getMessages/${conversation._id}`
            );
            setMessages(res.data.data);

            // Mark as read
            await axios.put(`${baseUrl}/api/chat/markAsRead/${conversation._id}/seller`);

            // Reset unread count in UI
            setConversations((prev) =>
                prev.map((conv) =>
                    conv._id === conversation._id
                        ? { ...conv, unreadSeller: 0 }
                        : conv
                )
            );
        } catch (err) {
            console.log("Open Conversation Error:", err);
        }
    };

    const handleImageSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSendMessage = async () => {
        if ((!newMessage.trim() && !selectedImage) || !selectedConversation) return;

        let imagePath = "";
        if (selectedImage) {
            setIsUploading(true);
            const formData = new FormData();
            formData.append("image", selectedImage);
            try {
                const res = await axios.post(`${baseUrl}/api/chat/upload`, formData);
                imagePath = res.data.filename;
            } catch (err) {
                toast.error("Failed to upload image");
                setIsUploading(false);
                return;
            }
        }

        const messageData = {
            conversationId: selectedConversation._id,
            senderId: user._id,
            receiverId: selectedConversation.userId._id,
            message: newMessage,
            senderRole: "seller",
            image: imagePath
        };

        socket.emit("sendMessage", messageData);
        socket.emit("stopTyping", {
            conversationId: selectedConversation._id,
            senderId: user._id,
            receiverId: selectedConversation.userId._id,
        });

        // Optimistically add message to UI
        setMessages((prev) => [
            ...prev,
            {
                ...messageData,
                SenderRole: "seller",
                _id: Date.now(),
                createdAt: new Date(),
            },
        ]);
        
        setNewMessage("");
        setSelectedImage(null);
        setImagePreview(null);
        setIsUploading(false);
    };

    const handleDeleteMessage = async (messageId) => {
        try {
            await axios.delete(`${baseUrl}/api/chat/message/${messageId}`);
            setMessages((prev) => prev.filter(m => m._id !== messageId));
            socket.emit("deleteMessage", { 
                messageId, 
                conversationId: selectedConversation._id, 
                receiverId: selectedConversation.userId._id 
            });
            toast.success("Message deleted");
        } catch (err) {
            toast.error("Failed to delete message");
        }
    };

    const startEditing = (msg) => {
        setEditingMessage(msg);
        setNewMessage(msg.message);
    };

    const handleUpdateMessage = async () => {
        if (!newMessage.trim() || !editingMessage) return;
        try {
            await axios.put(`${baseUrl}/api/chat/message/${editingMessage._id}`, { message: newMessage });
            setMessages((prev) => prev.map(m => m._id === editingMessage._id ? { ...m, message: newMessage } : m));
            socket.emit("editMessage", { 
                messageId: editingMessage._id, 
                conversationId: selectedConversation._id, 
                newMessage, 
                receiverId: selectedConversation.userId._id 
            });
            setEditingMessage(null);
            setNewMessage("");
            toast.success("Message updated");
        } catch (err) {
            toast.error("Failed to update message");
        }
    };

    const handleTyping = (e) => {
        setNewMessage(e.target.value);
        if (!selectedConversation) return;

        if (!typing) {
            setTyping(true);
            socket.emit("typing", {
                conversationId: selectedConversation._id,
                senderId: user._id,
                receiverId: selectedConversation.userId._id,
            });
        }

        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => {
            socket.emit("stopTyping", {
                conversationId: selectedConversation._id,
                senderId: user._id,
                receiverId: selectedConversation.userId._id,
            });
            setTyping(false);
        }, 1500);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (editingMessage) {
                handleUpdateMessage();
            } else {
                handleSendMessage();
            }
        }
    };

    const isOnline = (userId) => onlineUsers.includes(userId?.toString());

    const formatTime = (date) => {
        return new Date(date).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="flex h-[calc(100vh-80px)] bg-[#fdfaf6] border border-[#e8dccb] rounded-lg overflow-hidden relative">

            {/* LEFT: Conversation List */}
            <div className="w-[300px] border-r border-[#e8dccb] flex flex-col flex-shrink-0 bg-white">

                <div className="p-4 border-b border-[#e8dccb]">
                    <h2 className="font-serif text-lg text-[#1a1c21]">Messages</h2>
                    <p className="text-xs text-[#b0a395] mt-1">
                        {conversations.length} conversations
                    </p>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {conversations.length === 0 ? (
                        <div className="p-6 text-center text-sm text-[#b0a395]">
                            No conversations yet
                        </div>
                    ) : (
                        conversations.map((conv) => (
                            <div
                                key={conv._id}
                                onClick={() => openConversation(conv)}
                                className={`flex items-center gap-3 p-4 cursor-pointer border-b border-[#f0e8de] hover:bg-[#fdf5ee] transition-colors ${selectedConversation?._id === conv._id
                                    ? "bg-[#fdf5ee] border-l-4 border-l-[#a87a52]"
                                    : ""
                                    }`}
                            >
                                {/* Avatar */}
                                <div className="relative flex-shrink-0">
                                    <img
                                        src={
                                            conv.userId?.userImage ||
                                            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                        }
                                        alt={conv.userId?.username}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    {isOnline(conv.userId?._id) && (
                                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
                                    )}
                                </div>

                                {/* Info */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-center">
                                        <p className="text-sm font-medium text-[#1a1c21] truncate">
                                            {conv.userId?.username}
                                        </p>
                                        <p className="text-[10px] text-[#b0a395] flex-shrink-0 ml-2">
                                            {conv.lastMessageTime
                                                ? formatTime(conv.lastMessageTime)
                                                : ""}
                                        </p>
                                    </div>
                                    <div className="flex justify-between items-center mt-0.5">
                                        <p className="text-xs text-[#b0a395] truncate">
                                            {conv.lastMessage || "Start a conversation"}
                                        </p>
                                        {conv.unreadSeller > 0 && (
                                            <span className="bg-[#a87a52] text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center flex-shrink-0 ml-2">
                                                {conv.unreadSeller}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* RIGHT: Chat Window */}
            {selectedConversation ? (
                <div className="flex-1 flex flex-col bg-[#fdfaf6]">

                    {/* Chat Header */}
                    <div className="flex items-center gap-3 p-4 border-b border-[#e8dccb] bg-white z-10">
                        <div className="relative">
                            <img
                                src={
                                    selectedConversation.userId?.userImage ||
                                    "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                                }
                                alt={selectedConversation.userId?.username}
                                className="w-9 h-9 rounded-full object-cover"
                            />
                            {isOnline(selectedConversation.userId?._id) && (
                                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
                            )}
                        </div>
                        <div>
                            <p className="text-sm font-medium text-[#1a1c21]">
                                {selectedConversation.userId?.username}
                            </p>
                            <p className="text-[11px] text-[#b0a395]">
                                {isOnline(selectedConversation.userId?._id)
                                    ? "Online"
                                    : "Offline"}
                            </p>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
                        {messages.map((msg) => {
                            const role = msg.SenderRole || msg.senderRole;
                            const isOwn = role === "seller";
                            return (
                                <div key={msg._id} className={`flex ${isOwn ? "justify-end" : "justify-start"} group relative mb-2`}>
                                    <div className={`max-w-[75%] flex flex-col ${isOwn ? "items-end" : "items-start"}`}>
                                        
                                        {/* Action Buttons (Edit/Delete) */}
                                        {isOwn && typeof msg._id !== "number" && (
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-6 right-0 flex gap-2 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full shadow-sm border border-[#e8dccb]">
                                                <button onClick={() => startEditing(msg)} className="text-[#b0a395] hover:text-[#a87a52]">
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                                                    </svg>
                                                </button>
                                                <button onClick={() => handleDeleteMessage(msg._id)} className="text-[#b0a395] hover:text-red-500">
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" />
                                                    </svg>
                                                </button>
                                            </div>
                                        )}

                                        <div className={`px-4 py-2.5 rounded-2xl text-sm ${isOwn
                                            ? "bg-[#a87a52] text-white rounded-tr-none shadow-sm"
                                            : "bg-white border border-[#e8dccb] text-[#1a1c21] rounded-tl-none shadow-sm"
                                            }`}>
                                            
                                            {msg.image && (
                                                <img 
                                                    src={`${baseUrl}/uploads/${msg.image}`} 
                                                    alt="Chat" 
                                                    className="max-sm:max-w-full max-w-[250px] rounded-lg mb-2 cursor-pointer hover:opacity-90 transition-opacity"
                                                    onClick={() => window.open(`${baseUrl}/uploads/${msg.image}`, '_blank')}
                                                />
                                            )}
                                            
                                            {msg.message && <p className="leading-relaxed whitespace-pre-wrap">{msg.message}</p>}
                                            
                                            <p className={`text-[10px] mt-1 ${isOwn ? "text-white/70 text-right" : "text-[#b0a395]"}`}>
                                                {formatTime(msg.createdAt)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {/* Typing indicator */}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-white border border-[#e8dccb] px-4 py-2.5 rounded-2xl rounded-tl-none shadow-sm">
                                    <div className="flex gap-1 items-center h-4">
                                        <span className="w-2 h-2 bg-[#b0a395] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                        <span className="w-2 h-2 bg-[#b0a395] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                        <span className="w-2 h-2 bg-[#b0a395] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                                    </div>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Message Input Area */}
                    <div className="p-4 border-t border-[#e8dccb] bg-white">
                        
                        {/* Image Preview */}
                        {imagePreview && (
                            <div className="relative inline-block mb-3">
                                <img src={imagePreview} alt="Preview" className="h-20 w-20 object-cover rounded-lg border border-[#e8dccb]" />
                                <button 
                                    onClick={() => { setSelectedImage(null); setImagePreview(null); }}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs shadow-md"
                                >
                                    ×
                                </button>
                            </div>
                        )}

                        {/* Editing indicator */}
                        {editingMessage && (
                            <div className="mb-2 flex items-center justify-between bg-[#fdf5ee] px-3 py-1.5 rounded-lg border-l-4 border-[#a87a52]">
                                <p className="text-xs text-[#a87a52] font-medium">Editing message</p>
                                <button onClick={() => { setEditingMessage(null); setNewMessage(""); }} className="text-xs text-[#b0a395] hover:text-[#a87a52]">Cancel</button>
                            </div>
                        )}

                        <div className="flex items-end gap-3">
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                ref={fileInputRef}
                                onChange={handleImageSelect}
                            />
                            <button 
                                onClick={() => fileInputRef.current.click()}
                                disabled={isUploading}
                                className="p-2.5 text-[#b0a395] hover:text-[#a87a52] hover:bg-[#fdf5ee] rounded-full transition-colors disabled:opacity-50"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                    <circle cx="8.5" cy="8.5" r="1.5" />
                                    <polyline points="21 15 16 10 5 21" />
                                </svg>
                            </button>

                            <textarea
                                value={newMessage}
                                onChange={handleTyping}
                                onKeyDown={handleKeyDown}
                                placeholder="Type a message..."
                                disabled={isUploading}
                                rows={1}
                                className="flex-1 bg-[#fdfaf6] border border-[#e8dccb] rounded-2xl px-4 py-2.5 text-sm text-[#1a1c21] placeholder-[#b0a395] focus:outline-none focus:border-[#a87a52] disabled:opacity-50 resize-none max-h-32"
                                onInput={(e) => {
                                    e.target.style.height = 'inherit';
                                    e.target.style.height = `${e.target.scrollHeight}px`;
                                }}
                            />

                            <button
                                onClick={editingMessage ? handleUpdateMessage : handleSendMessage}
                                disabled={(!newMessage.trim() && !selectedImage) || isUploading}
                                className="bg-[#a87a52] hover:bg-[#8e613b] text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 mb-1 shadow-sm"
                            >
                                {isUploading ? (
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                                        <line x1="22" y1="2" x2="11" y2="13" />
                                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                </div>
            ) : (
                // No conversation selected
                <div className="flex-1 flex items-center justify-center flex-col gap-4 text-center p-8 bg-[#fdfaf6]">
                    <div className="w-16 h-16 bg-[#fdf5ee] rounded-full flex items-center justify-center">
                        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#a87a52" strokeWidth="1.5">
                            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                        </svg>
                    </div>
                    <p className="font-serif text-xl text-[#1a1c21]">Your Messages</p>
                    <p className="text-sm text-[#b0a395] max-w-[260px]">
                        Select a conversation from the left to start chatting with a customer.
                    </p>
                </div>
            )}

        </div>
    );
}

export default Chat;