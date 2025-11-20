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
  const msgUrl = "/api/global";

  useEffect(() => {
    const socketTemp = io("ws://localhost:5000");
    const getMessages = async () => {
      const { data } = await axios.get(msgUrl);
      if (data.success) {
        setMessages(data.messages);
      }
    };
    getMessages();
    setSocket(user ? socketTemp : null);

    socketTemp.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    socketTemp.on("typing", (data) => {
      if (!typing.find((item) => item.userId === data.userId)) {
        setTyping((prev) => [...prev, data]);
        console.log(typing);
      }
    });

    // setInterval(() => {
    //   setTyping([]);
    // }, 20000);

    return () => {
      socketTemp.close();
    };
  }, []);

  const sendGlobalMessage = (text: string) => {
    if (socket && text.trim() !== "") {
      socket.emit("message", {
        sender: {
          id: user.id,
          picture: user.picture,
        },
        text,
      });
    }
  };

  return (
    <SocketContext.Provider value={{ socket, messages, sendGlobalMessage, typing }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
