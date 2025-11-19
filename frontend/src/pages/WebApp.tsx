import ChatProfile from "../components/ChatProfile";
import globe from "../assets/globe.png";
import { Route, Routes } from "react-router-dom";
import Chat from "./Chat";

const WebApp = () => {
  return (
    <div className="app w-full flex flex-col h-svh py-2 pb-5">
      <p className="title font-poppins font-extrabold text-white text-3xl mb-3">chat</p>
      <div className="chats flex flex-col bg-black/50 grow h-11/12 rounded-lg relative">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <ChatProfile img={globe} name="Global Chat" sub="last msg" />
                {/* <ChatProfile img={globe} name="Global Chat" sub="last msg" /> */}
              </>
            }
          />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </div>
    </div>
  );
};

export default WebApp;
