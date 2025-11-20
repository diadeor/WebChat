import express from "express";
import { Server } from "socket.io";
import { PORT } from "./config/env.js";
import userRouter from "./routes/users.route.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import ConnectDB from "./config/db.js";
import authUser from "./middlewares/auth.middleware.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import Global from "./models/global.model.js";
import globalRouter from "./routes/global.route.js";

const app = express();

// Listener
const expressServer = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
  ConnectDB();
});

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/auth", authRouter);
app.use("/api/users", authUser, userRouter);
app.use("/api/global", globalRouter);

// Error middleware
app.use(errorMiddleware);

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

  socket.on("message", async ({ sender, text }) => {
    const addMsg = await Global.create({ sender, text });

    io.emit("receive_message", { sender, text });
  });

  socket.on("activity", ({ user, userId }) => {
    const firstName = user.split(" ")[0].trim();
    socket.broadcast.emit("typing", { firstName, userId });
  });
});
