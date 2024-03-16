// Web chat socket server

import { Server } from "socket.io";

const io = new Server(3001, {
  cors: {
    origin: "*",
  },
});

const rooms = new Map();

const usernames = new Map();

io.on("connection", (socket) => {
  // Listen for Join chat event from user
  // POSSIBLE DEBUG
  socket.on("join-chat-room", (chatRoom, username) => {
    socket.join(chatRoom);
    if (!rooms.has(chatRoom)) {
      rooms.set(chatRoom, new Set());
    }
    rooms.get(chatRoom).add(username);
    if (!usernames.has(chatRoom)) {
      usernames.set(chatRoom, new Set());
    }
    usernames.get(chatRoom).add(username);
    // emit the map object of usernames to users in the same chat everytime someone has joined
    const users_array = [...usernames.get(chatRoom)];
    io.to(chatRoom).emit("new-user-joined-chat", users_array);
  });

  // Listen to Leave chat event from user
  socket.on("leave-chat-room", (chatRoom, username) => {
    socket.leave(chatRoom);
    if (rooms.has(chatRoom)) {
      rooms.get(chatRoom).delete(username);
      usernames.get(chatRoom).delete(username);
      if (rooms.get(chatRoom).size === 0) {
        rooms.delete(chatRoom);
        usernames.delete(chatRoom);
      } else {
        const users_array = [...usernames.get(chatRoom)];
        io.to(chatRoom).emit("user-left-chat", users_array);
      }
    }
  });

  // Listen for message event from user
  socket.on("message-to-server", (data, chatRoom) => {
    console.log(data);
    io.to(chatRoom).emit("message-to-client", data);
  });
});
