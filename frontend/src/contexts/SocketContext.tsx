import { useContext, createContext, type ReactNode, useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "./AuthContext";
import axios from "axios";

const SocketContext: any = createContext<any>(undefined);

export const useSocket: any = () => useContext(SocketContext);

type Message = {
  id: string;
  text: string;
  sender: string | undefined;
  timestamp: number;
};

type Typing = {
  user: string;
  userId: string;
};
const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [typing, setTyping] = useState<Typing[]>([]);
  const { user } = useAuth();
  const backendUrl = import.meta.env.VITE_API_URL;
  const msgUrl = `${backendUrl}/api/global`;
  const socketUrl = "wss://webchat-production-b89a.up.railway.app/";
  let activityTimer: any;

  useEffect(() => {
    const socketTemp = io(socketUrl, {
      autoConnect: false,
      withCredentials: true,
      transports: ["websocket", "polling"],
    });
    const getMessages = async () => {
      const { data } = await axios.get(msgUrl);
      if (data.success) {
        setMessages(data.messages);
      }
    };
    getMessages();
    user && socketTemp.connect();
    setSocket(socketTemp);

    socketTemp.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    socketTemp.on("typing", (data) => {
      setTyping((prev) => {
        const userExists = prev.find((item) => item.userId === data.userId);
        return userExists ? [...prev] : [...prev, data];
      });
      clearTimeout(activityTimer);
      activityTimer = setTimeout(() => {
        setTyping([]);
      }, 3000);
    });

    return () => {
      socketTemp.close();
    };
  }, []);

  const sendGlobalMessage = (text: string) => {
    if (socket && text.trim() !== "") {
      socket.emit("message", text);
      clearTimeout(activityTimer);
    }
  };

  return (
    <SocketContext.Provider value={{ socket, messages, sendGlobalMessage, typing }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
