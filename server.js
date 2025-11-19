import express from "express";
import { Server } from "socket.io";
import { PORT } from "./config/env.js";
import userRouter from "./routes/users.route.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import ConnectDB from "./config/db.js";

const app = express();

const expressServer = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  ConnectDB();
});

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

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
  const clientIp = socket.handshake.headers["x-forwarded-for"] || socket.handshake.address;

  console.log(`User connected from IP: ${clientIp}`);
  socket.on("message", (data) => {
    io.emit("receive_message", data);
  });
});
