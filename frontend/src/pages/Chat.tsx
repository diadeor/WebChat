import { IoCaretBackOutline, IoSend } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { useSocket } from "../contexts/SocketContext.tsx";
import { useAuth } from "../contexts/AuthContext.tsx";

type Message = {
  sender: {
    id: string;
    picture: string;
  };
  _id: string;
  text: string;
};

const Message = ({
  msg,
  other = true,
  picture,
  userId,
}: {
  msg: string;
  other?: boolean;
  userId: string | undefined;
  picture?: string;
}) => {
  return (
    <li className={`flex flex-row gap-1 ${other ? "justify-start" : "justify-end"} items-center`}>
      <Link to={`/profile/${userId}`}>
        {other && <img src={picture} alt="" className="rounded-full h-8 aspect-square" />}
      </Link>
      <p
        className={`${other ? "bg-gray-800" : "bg-blue-700"} p-2 px-4 text-left max-w-6/10 ${
          msg.length > 25 ? "rounded-2xl" : "rounded-full"
        }`}
      >
        {msg}
      </p>
    </li>
  );
};

const Chat = ({ name, img }: { name: string; img: string }) => {
  const [inputValue, setInputValue] = useState<string>("");
  const isValid = inputValue.trim() !== "";
  const { socket, messages, sendGlobalMessage, typing } = useSocket();
  const input = useRef<HTMLInputElement>(null);
  const { user } = useAuth();
  const nav = useNavigate();

  if (!user) nav("/login");

  // console.log(messages);

  const handleSend = () => {
    sendGlobalMessage(inputValue);
    setInputValue("");
  };

  const handleEnter = (e: { key: string }) => {
    const key = e.key;
    socket.emit("activity", { user: user.name, userId: user.id });

    if (key === "Enter") {
      handleSend();
    }
  };
  return (
    <div className=" chat text-white flex flex-col h-full">
      <div className="top flex flex-row items-center p-4 border-b-2 border-black/40">
        <Link to="/app" className="pr-3">
          <IoCaretBackOutline size="1.5em" />
        </Link>
        <img src={img} alt="" className="h-10 aspect-square mr-2" />
        <p className="title font-fugaz text-lg tracking-wider">{name}</p>
      </div>
      <ul className="flex flex-col grow p-2 font-poppins gap-1 h-full overflow-y-auto styled-scrollbar">
        {messages?.map((item: Message, index: number) => {
          return (
            user.id && (
              <Message
                msg={item.text}
                key={index}
                userId={item.sender.id}
                other={user.id === item.sender.id ? false : true}
                picture={item.sender.picture}
              />
            )
          );
        })}
      </ul>
      {typing.length != 0 && (
        <p className="font-poppins px-3 bg-black/20 pt-2 pb-0">
          <span className="font-bold">{typing.map((item: string) => `${item}, `)}</span> is
          typing...
        </p>
      )}
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
