const Message = require("../models/Message")
const Conversation = require("../models/Conversation")
//store online users
// {userId: socketId, role: "user" | "seller"}
const onlineUsers = {}
const initSocket = (io) => {
    io.on("connection", (socket) => {  //Fires every time a client connects. Each client gets a unique socket.id automatically.
        console.log("User connected", socket.id)

        // User joins with their userId
        socket.on("addUser", async (userId) => {
            onlineUsers[userId] = socket.id
            io.emit("getOnlineUsers", Object.keys(onlineUsers))
            console.log(onlineUsers)
        });

        // Send message
        socket.on("sendMessage", async (data) => {
            const {
                conversationId,
                senderId,
                receiverId,
                message,
                senderRole,
                image
            } = data

            try {
                // Save message to database or Creates a Message document in MongoDB
                const newMessage = new Message({
                    conversationId,
                    senderId,
                    receiverId,
                    message,
                    SenderRole: senderRole,
                    image: image || ""
                })
                await newMessage.save()

                // Update conversation last message
                const updateField = senderRole === "user" ? "unreadSeller" : "unreadUser";
                await Conversation.findByIdAndUpdate(conversationId, {
                    lastMessage: message,
                    lastMessageTime: Date.now(),
                    $inc: { [updateField]: 1 },
                })

                const savedMessage = newMessage.toObject()

                // Send message to receiver if online
                const receiverSocketId = onlineUsers[receiverId]
                if (receiverSocketId) {
                    io.to(receiverSocketId).emit("receiveMessage", savedMessage)
                }
                // Send back to sender to confirm
                socket.emit("messageSent", savedMessage)
            }
            catch (error) {
                console.log(error)
            }
        })

        //Typing indicator
        socket.on("typing", ({ conversationId, senderId, receiverId }) => {
            const receiverSocketId = onlineUsers[receiverId]
            if (receiverSocketId) {
                io.to(receiverSocketId).emit("userTyping", { conversationId, senderId })
            }
        })
        // Stop typing
        socket.on("stopTyping", ({ conversationId, senderId, receiverId }) => {
            const receiverSocketId = onlineUsers[receiverId]
            if (receiverSocketId) {
                io.to(receiverSocketId).emit("userStopTyping", { conversationId, senderId })
            }
        })

        // Delete Message
        socket.on("deleteMessage", ({ messageId, conversationId, receiverId }) => {
            const receiverSocketId = onlineUsers[receiverId]
            if (receiverSocketId) {
                io.to(receiverSocketId).emit("messageDeleted", { messageId, conversationId })
            }
        })

        // Edit Message
        socket.on("editMessage", ({ messageId, conversationId, newMessage, receiverId }) => {
            const receiverSocketId = onlineUsers[receiverId]
            if (receiverSocketId) {
                io.to(receiverSocketId).emit("messageEdited", { messageId, conversationId, newMessage })
            }
        })
        // User disconnects
        socket.on("disconnect", () => {
            console.log("User disconnected", socket.id)
            Object.keys(onlineUsers).forEach(userId => {
                if (onlineUsers[userId] === socket.id) {
                    delete onlineUsers[userId];
                }
            });
            io.emit("getOnlineUsers", Object.keys(onlineUsers))
        })
    });
}
module.exports = initSocket