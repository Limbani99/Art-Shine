const express = require("express")
const Message = require("../models/Message")
const Conversation = require("../models/Conversation")

// Get or create conversation between user and seller
const getOrCreateConversation = async (req, res) => {
    try {
        const { userId, sellerId } = req.body
        let conversation = await Conversation.findOne({ userId, sellerId })
        if (!conversation) {
            conversation = await Conversation.create({
                userId,
                sellerId,
            })
        }
        res.status(200).json({ message: "Conversation fetched successfully", data: conversation })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// Get all conversations for seller (chat list)
const getSellerConversations = async (req, res) => {
    try {
        const { sellerId } = req.params
        const conversations = await Conversation.find({ sellerId })
            .populate("userId", "username email userImage")
            .sort({ lastMessageTime: -1 });
        res.status(200).json({ message: "Conversations fetched successfully", data: conversations })
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

// Get all conversations for user (chat list)
const getUserConversations = async (req, res) => {
    try {
        const { userId } = req.params;
        const conversations = await Conversation.find({ userId })
            .populate("sellerId", "username email userImage")
            .sort({ lastMessageTime: -1 });
        res.status(200).json({ message: "Conversations fetched successfully", data: conversations })
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

// Get all messages in a conversation
const getMessages = async (req, res) => {
    try {
        const { conversationId } = req.params;
        const messages = await Message.find({ conversationId })
            .populate("senderId", "username email userImage")
            .populate("receiverId", "username email userImage")
            .sort({ createdAt: 1 });
        res.status(200).json({ message: "Messages fetched successfully", data: messages })
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

// Mark messages as read
const markAsRead = async (req, res) => {
    try {
        const { conversationId, role } = req.params;
        // Mark messages SENT BY THE OTHER PARTY as read
        const messages = await Message.updateMany(
            { conversationId, SenderRole: role === "seller" ? "user" : "seller" },
            { isRead: true }
        )
        const updateField = role === "seller" ? "unreadSeller" : "unreadUser";
        await Conversation.findByIdAndUpdate(conversationId, {
            [updateField]: 0,
        });
        res.status(200).json({ message: "Messages marked as read successfully", data: messages })
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
}

// Delete Message
const deleteMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedMessage = await Message.findByIdAndDelete(id);
        if (!deletedMessage) {
            return res.status(404).json({ message: "Message not found" });
        }
        res.status(200).json({ message: "Message deleted successfully", data: deletedMessage });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Update Message
const updateMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const { message } = req.body;
        const updatedMessage = await Message.findByIdAndUpdate(id, { message }, { new: true });
        if (!updatedMessage) {
            return res.status(404).json({ message: "Message not found" });
        }
        res.status(200).json({ message: "Message updated successfully", data: updatedMessage });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Upload Chat Image
const uploadChatImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        res.status(200).json({ message: "Image uploaded successfully", filename: req.file.filename });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    getOrCreateConversation,
    getSellerConversations,
    getUserConversations,
    getMessages,
    markAsRead,
    deleteMessage,
    updateMessage,
    uploadChatImage
}
