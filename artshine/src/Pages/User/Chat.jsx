import { useState, useEffect, useRef } from "react";
import { useData } from "../../context/DataProvider";
import { Link } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";
import toast from "react-hot-toast";

const baseUrl = import.meta.env.VITE_BACKEND_URL;
const socket = io(baseUrl);
const SELLER_ID = "69cf8175877ac7459a782f3a"; // Art Shine Studio seller ID

function Chat() {
    const { user } = useData();
    const [conversation, setConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [isSellerOnline, setIsSellerOnline] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [typing, setTyping] = useState(false);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [editingMessage, setEditingMessage] = useState(null);
    
    const messagesEndRef = useRef(null);
    const typingTimeoutRef = useRef(null);
    const fileInputRef = useRef(null);

    // Connect user to socket when user is available
    useEffect(() => {
        if (user?._id) {
            socket.emit("addUser", user._id);
        }
        socket.on("getOnlineUsers", (users) => {
            setIsSellerOnline(users.includes(SELLER_ID));
        });
        return () => {
            socket.off("getOnlineUsers");
        };
    }, [user]);

    // Get or create conversation with seller
    useEffect(() => {
        if (user?._id) {
            initConversation();
        } else if (user === null) {
            setLoading(false);
        }
    }, [user]);

    const initConversation = async () => {
        setLoading(true);
        try {
            const res = await axios.post(
                `${baseUrl}/api/chat/getOrCreateConversation`,
                { userId: user._id, sellerId: SELLER_ID }
            );
            const conv = res.data.data;
            setConversation(conv);

            const msgRes = await axios.get(
                `${baseUrl}/api/chat/getMessages/${conv._id}`
            );
            setMessages(msgRes.data.data || []);

            await axios.put(`${baseUrl}/api/chat/markAsRead/${conv._id}/user`);
        } catch (err) {
            console.log("Chat Init Error:", err);
        } finally {
            setLoading(false);
        }
    };

    // Listen for incoming messages & updates
    useEffect(() => {
        const handleReceiveMessage = (message) => {
            const senderRole = message.SenderRole || message.senderRole;
            if (senderRole === "seller") {
                setMessages((prev) => {
                    const isDuplicate = prev.some(m => m._id?.toString() === message._id?.toString());
                    if (isDuplicate) return prev;
                    return [...prev, message];
                });
            }
        };

        const handleMessageSent = (message) => {
            setMessages((prev) => {
                const withoutTemp = prev.filter(m => typeof m._id !== "number");
                const isDuplicate = withoutTemp.some(m => m._id?.toString() === message._id?.toString());
                if (isDuplicate) return withoutTemp;
                return [...withoutTemp, message];
            });
        };

        const handleMessageDeleted = ({ messageId }) => {
            setMessages((prev) => prev.filter(m => m._id !== messageId));
        };

        const handleMessageEdited = ({ messageId, newMessage }) => {
            setMessages((prev) => prev.map(m => m._id === messageId ? { ...m, message: newMessage } : m));
        };

        socket.on("receiveMessage", handleReceiveMessage);
        socket.on("messageSent", handleMessageSent);
        socket.on("messageDeleted", handleMessageDeleted);
        socket.on("messageEdited", handleMessageEdited);
        
        socket.on("userTyping", ({ senderId }) => {
            if (senderId === SELLER_ID) setIsTyping(true);
        });
        socket.on("userStopTyping", ({ senderId }) => {
            if (senderId === SELLER_ID) setIsTyping(false);
        });

        return () => {
            socket.off("receiveMessage", handleReceiveMessage);
            socket.off("messageSent", handleMessageSent);
            socket.off("messageDeleted", handleMessageDeleted);
            socket.off("messageEdited", handleMessageEdited);
            socket.off("userTyping");
            socket.off("userStopTyping");
        };
    }, [conversation?._id]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

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
        if ((!newMessage.trim() && !selectedImage) || !conversation || !user) return;

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
            conversationId: conversation._id,
            senderId: user._id,
            receiverId: SELLER_ID,
            message: newMessage,
            senderRole: "user",
            image: imagePath
        };

        socket.emit("sendMessage", messageData);
        socket.emit("stopTyping", {
            conversationId: conversation._id,
            senderId: user._id,
            receiverId: SELLER_ID,
        });

        setMessages((prev) => [
            ...prev,
            { ...messageData, SenderRole: "user", _id: Date.now(), createdAt: new Date() },
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
            socket.emit("deleteMessage", { messageId, conversationId: conversation._id, receiverId: SELLER_ID });
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
                conversationId: conversation._id, 
                newMessage, 
                receiverId: SELLER_ID 
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
        if (!conversation) return;

        if (!typing) {
            setTyping(true);
            socket.emit("typing", {
                conversationId: conversation._id,
                senderId: user._id,
                receiverId: SELLER_ID,
            });
        }
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => {
            socket.emit("stopTyping", {
                conversationId: conversation._id,
                senderId: user._id,
                receiverId: SELLER_ID,
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

    const formatTime = (date) => {
        return new Date(date).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    if (!loading && !user) {
        return (
            <div className="max-w-2xl mx-auto h-[calc(100vh-80px)] flex flex-col items-center justify-center gap-6 my-4 px-4">
                <div className="w-16 h-16 bg-[#fdf5ee] rounded-full flex items-center justify-center">
                    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#a87a52" strokeWidth="1.5">
                        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                    </svg>
                </div>
                <p className="font-serif text-xl text-[#1a1c21]">Chat with Art Shine Studio</p>
                <p className="text-sm text-[#b0a395] text-center max-w-[280px]">
                    Please log in to start a conversation with us.
                </p>
                <Link to="/login" className="bg-[#a87a52] hover:bg-[#8e613b] text-white px-8 py-3 rounded-full text-sm font-medium transition-colors">
                    Login to Chat
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto h-[calc(100vh-80px)] flex flex-col bg-[#fdfaf6] border border-[#e8dccb] rounded-lg overflow-hidden my-4 relative">
            
            {/* Header */}
            <div className="flex items-center gap-3 p-4 border-b border-[#e8dccb] bg-white z-10">
                <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-[#a87a52] flex items-center justify-center text-white font-serif text-lg">
                        A
                    </div>
                    {isSellerOnline && (
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
                    )}
                </div>
                <div>
                    <p className="text-sm font-medium text-[#1a1c21]">Art Shine Studio</p>
                    <p className="text-[11px] text-[#b0a395]">
                        {isSellerOnline ? "Online" : "Offline"}
                    </p>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
                {loading ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="flex gap-1.5">
                            <span className="w-2.5 h-2.5 bg-[#a87a52] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                            <span className="w-2.5 h-2.5 bg-[#a87a52] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                            <span className="w-2.5 h-2.5 bg-[#a87a52] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                    </div>
                ) : (
                    <>
                        {messages.length === 0 && (
                            <div className="text-center py-8">
                                <p className="text-sm text-[#b0a395]">
                                    Send a message to start chatting with Art Shine Studio
                                </p>
                            </div>
                        )}

                        {messages.map((msg) => {
                            const role = msg.SenderRole || msg.senderRole;
                            const isOwn = role === "user";
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
                                                        <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" />
                                                    </svg>
                                                </button>
                                            </div>
                                        )}

                                        <div className={`px-4 py-2.5 rounded-2xl text-sm ${isOwn
                                            ? "bg-[#a87a52] text-white rounded-tr-none"
                                            : "bg-white border border-[#e8dccb] text-[#1a1c21] rounded-tl-none"
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

                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-white border border-[#e8dccb] px-4 py-2.5 rounded-2xl rounded-tl-none">
                                    <div className="flex gap-1 items-center h-4">
                                        <span className="w-2 h-2 bg-[#b0a395] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                                        <span className="w-2 h-2 bg-[#b0a395] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                        <span className="w-2 h-2 bg-[#b0a395] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
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
                        disabled={loading || isUploading}
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
                        disabled={loading || isUploading}
                        rows={1}
                        className="flex-1 bg-[#fdfaf6] border border-[#e8dccb] rounded-2xl px-4 py-2.5 text-sm text-[#1a1c21] placeholder-[#b0a395] focus:outline-none focus:border-[#a87a52] disabled:opacity-50 resize-none max-h-32"
                        onInput={(e) => {
                            e.target.style.height = 'inherit';
                            e.target.style.height = `${e.target.scrollHeight}px`;
                        }}
                    />

                    <button
                        onClick={editingMessage ? handleUpdateMessage : handleSendMessage}
                        disabled={(!newMessage.trim() && !selectedImage) || loading || isUploading}
                        className="bg-[#a87a52] hover:bg-[#8e613b] text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 mb-0.5 shadow-sm"
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
    );
}

export default Chat;