// Web chat socket server

import { Server } from "socket.io";

const io = new Server(3001, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  // socket.emit("welcome", "Message from Server");

  socket.on("message-to-server", (data) => {
    console.log(data);
    io.emit("message-to-client", data);
  });
});
