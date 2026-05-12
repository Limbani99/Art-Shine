const mongoose = require("mongoose")
const conversationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true,
    },
    lastMessage: {
        type: String,
        default: ""
    },
    lastMessageTime: {
        type: Date,
        default: Date.now
    },
    unreadSeller: {
        type: Number,
        default: 0,
    },
    unreadUser: {
        type: Number,
        default: 0,
    },
}, { timestamps: true }
)
module.exports = mongoose.model("Conversation", conversationSchema)