import express from "express";
import { Server } from "socket.io";
import { JWT_SECRET, PORT } from "./config/env.js";
import userRouter from "./routes/users.route.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import ConnectDB from "./config/db.js";
import authUser from "./middlewares/auth.middleware.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import Global from "./models/global.model.js";
import globalRouter from "./routes/global.route.js";
import jwt from "jsonwebtoken";
import User from "./models/users.model.js";
import cors from "cors";

const app = express();

// Listener
const expressServer = app.listen(PORT, "0.0.0.0", () => {
  console.log(`Listening on port ${PORT}`);
  ConnectDB();
});
app.set("trust proxy", 1);

// Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: ["https://web-chat-virid-two.vercel.app", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allows cookies to be sent
  }),
);

// Routes
app.get("/", (req, res, next) => res.send("Health check ok !!"));
app.use("/api/auth", authRouter);
app.use("/api/users", authUser, userRouter);
app.use("/api/global", globalRouter);

// Error middleware
app.use(errorMiddleware);

const io = new Server(expressServer, {
  pingTimeout: 60000,
  cors: {
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "http://192.168.1.82:5173",
      "http://192.168.1.50:5173",
      "https://web-chat-virid-two.vercel.app",
    ],
    credentials: true,
  },
});

io.use((server, next) => {
  try {
    const cookies = server.request.headers.cookie
      .split("; ")
      .find((cookie) => cookie.includes("token="));
    const token = cookies.slice(6);
    const user = jwt.verify(token, JWT_SECRET);
    if (!user) throw new Error("not logged in");
    server.data.user = user;
    next();
  } catch (error) {
    console.log(error.message);
  }
});

io.on("connection", async (socket) => {
  const user = await User.findById(socket.data.user.id);
  const userId = String(user._id);
  const { name, picture } = user;
  const clientIp = socket.handshake.headers["x-forwarded-for"] || socket.handshake.address;

  socket.join(userId);
  const sender = { id: userId, picture };
  socket.on("message", async (text) => {
    const addMsg = await Global.create({ sender, text });

    io.emit("receive_message", { sender, text });
  });

  socket.on("private_message", ({ to, text }) => {
    socket.to(to).emit("private_message", text);
  });

  socket.on("activity", () => {
    const firstName = name.split(" ")[0].trim();
    socket.broadcast.emit("typing", { firstName, userId });
  });
});
