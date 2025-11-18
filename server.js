import express from "express";
import { Server, Socket } from "socket.io";

const app = express();
const PORT = 3000;

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

const io = new Server(server);

io.on("connection", (socket) => {
  console.log("hi");
  console.log(socket.id);
});
