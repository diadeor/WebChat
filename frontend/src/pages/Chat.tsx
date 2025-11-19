import { IoCaretBackOutline, IoSend } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import { useSocket } from "../contexts/SocketContext.tsx";

type Message = {
  id: string;
  text: string;
  sender: string | undefined;
  timestamp: number;
};

const Message = ({
  msg,
  other = true,
  user,
}: {
  msg: string;
  other?: boolean;
  user: string | undefined;
}) => {
  const updatedUser = user ? user?.slice(0, 5) : "";
  return (
    <li className={`flex flex-row ${other ? "justify-start" : "justify-end"} items-center`}>
      <p
        className={`${other ? "bg-gray-800" : "bg-blue-700"} p-2 px-4 text-left max-w-6/10 ${
          msg.length > 25 ? "rounded-2xl" : "rounded-full"
        }`}
      >
        {`${updatedUser ? `${updatedUser} :` : ""} ${msg}`}
      </p>
    </li>
  );
};

const Chat = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const isValid = inputValue !== "";
  const { socket, messages, sendMessage } = useSocket();
  const input = useRef<HTMLInputElement>(null);
  // console.log(messages);

  const handleSend = () => {
    sendMessage(inputValue);
    setInputValue("");
  };

  const handleEnter = (e: { key: string }) => {
    const key = e.key;
    if (key === "Enter") {
      handleSend();
    }
  };
  return (
    <div className=" chat text-white flex flex-col h-full">
      <div className="top flex flex-row items-center gap-5 p-4 border-b-2 border-black/40">
        <Link to="/app">
          <IoCaretBackOutline size="1.5em" />
        </Link>

        <p className="title font-fugaz text-lg">Sanjay Gaire</p>
      </div>
      <ul className="flex flex-col grow p-2 font-poppins gap-1 h-full overflow-y-auto styled-scrollbar">
        {messages?.map((item: Message, index: number) => {
          return (
            <Message
              msg={item.text}
              key={index}
              user={socket.id === item.sender ? "" : item.sender}
              other={socket.id === item.sender ? false : true}
            />
          );
        })}
      </ul>
      <div className="input flex flex-row bottom-0 gap-2 px-3 py-4 pr-2 rounded-b-lg bg-black/20 w-full items-center ">
        <input
          type="text"
          name="message"
          ref={input}
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          autoComplete="off"
          placeholder="Message"
          onKeyDown={(e) => handleEnter(e)}
          className="bg-white/10 border-2 border-blue-300 w-11/12 flex-1 h-12 rounded-full px-4  placeholder:text-blue-300 font-poppins outline-0"
        />
        <IoSend
          className={` text-blue-300 ${isValid ? "active:scale-80" : ""} transition hover:scale-95`}
          size="1.7em"
          onClick={handleSend}
        />
      </div>
    </div>
  );
};

export default Chat;
