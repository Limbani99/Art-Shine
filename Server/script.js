const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors")
const http = require("http");
const { Server } = require("socket.io");
const initSocket = require("./socket/socket");

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173", "http://localhost:5174", "https://gaming-panorama-poem.ngrok-free.dev"],
        methods: ["GET", "POST"],
    },
});
initSocket(io);
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log(err);
})

app.use("/api/users", require("./routers/users"));
app.use("/api/seller", require("./routers/seller"))
app.use("/api/product", require("./routers/product"))
app.use("/api/category", require("./routers/category"))
app.use('/api/order', require("./routers/order"))
app.use('/api/chat', require("./routers/chat"))

app.get("/", (req, res) => {
    res.send("Hello World!");
});

server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
});