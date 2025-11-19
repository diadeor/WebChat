import express from "express";
import { Server } from "socket.io";
import { PORT } from "./config/env.js";

const app = express();

const expressServer = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

const io = new Server(expressServer, {
  cors: {
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "http://192.168.1.82:5173",
      "http://192.168.1.50:5173",
    ],
  },
});

io.on("connection", (socket) => {
  // console.log(`User ${socket.id.slice(0, 5)} connected`);
  socket.on("message", (data) => {
    io.emit("receive_message", data);
  });
});
