// Empty file
const mongoose = require("mongoose")
const Conversation = require("./Conversation")

const messageSchema = new mongoose.Schema({
    conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversation",
        require: true,
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,
    },
    message: {
        type: String,
        require: true,
        trim: true,
    },
    image: {
        type: String,
        default: "",
    },
    isRead: {
        type: Boolean,
        default: false,
    },
    SenderRole: {
        type: String,
        enum: ["user", "seller"],
        require: true,
    }
}, { timestamps: true })
module.exports = mongoose.model("Message", messageSchema)