import ChatProfile from "../components/ChatProfile";
import globe from "../assets/globe.png";
import { Route, Routes } from "react-router-dom";
import Chat from "./Chat";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const WebApp = () => {
  const { user } = useAuth();
  const nav = useNavigate();
  useEffect(() => {
    !user && nav("/login");
  }, []);

  return (
    <div className="app w-full flex flex-col h-svh py-2 pb-5">
      <div className="titles flex flex-row justify-between items-center font-poppins text-white mb-3">
        <p className="title font-extrabold text-3xl ">chat</p>
        <img src={user?.picture} alt="" className="rounded-full h-10 aspect-square" />
      </div>
      <div className="chats flex flex-col bg-black/50 grow h-11/12 rounded-lg relative">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <ChatProfile id="global" img={globe} name="Global Chat" sub="last msg" />
                {/* <ChatProfile img={globe} name="Global Chat" sub="last msg" /> */}
              </>
            }
          />
          <Route path="/chat/global" element={<Chat name="Global Chat" img={globe} />} />
        </Routes>
      </div>
    </div>
  );
};

export default WebApp;
