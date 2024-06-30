const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    // telling server which url(client url) will be making the request to this server
    methods: ["GET", "POST"],
  },
});

// HOW SOCKET.IO WORKS
// BASED ON events - listen to events

io.on("connection", (socket) => {
  console.log("user connected: ", socket.id);

  socket.on("join-room", (data) => {
    socket.join(data);
    console.log(`user with ${socket.id} joined the room with id ${data}`);
  });

  socket.on("send-message", (data) => {
    console.log("message data:", data);
    socket.to(data.room).emit("recieve-message", data);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});

server.listen(4001, () => {
  console.log("server running on 4001");
});
