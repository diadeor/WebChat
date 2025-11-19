import { useContext, createContext, type ReactNode, useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";

const SocketContext: any = createContext<any>(undefined);

export const useSocket: any = () => useContext(SocketContext);

type Message = {
  id: string;
  text: string;
  sender: string | undefined;
  timestamp: number;
};

const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const socketTemp = io("ws://localhost:5000");
    setSocket(socketTemp);

    socketTemp.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socketTemp.close();
    };
  }, []);

  const sendMessage = (text: string) => {
    if (socket && text.trim() !== "") {
      const msgData: Message = socket && {
        id: Date.now().toString(),
        sender: socket.id,
        text,
        timestamp: Date.now(),
      };
      socket.emit("message", msgData);
    }
  };

  return (
    <SocketContext.Provider value={{ socket, messages, sendMessage }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
