const express = require("express")
const route = express.Router()
const {
    getOrCreateConversation,
    getSellerConversations,
    getUserConversations,
    getMessages,
    markAsRead,
    deleteMessage,
    updateMessage,
    uploadChatImage
} = require("../controllers/chatController")
const upload = require("../middleware/upload")

route.post("/getOrCreateConversation", getOrCreateConversation)
route.get("/getSellerConversations/:sellerId", getSellerConversations)
route.get("/getUserConversations/:userId", getUserConversations)
route.get("/getMessages/:conversationId", getMessages)
route.put("/markAsRead/:conversationId/:role", markAsRead)
route.delete("/message/:id", deleteMessage)
route.put("/message/:id", updateMessage)
route.post("/upload", upload.single("image"), uploadChatImage)

module.exports = route