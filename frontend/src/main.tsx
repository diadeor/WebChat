import { createRoot } from "react-dom/client";
import SocketProvider from "./contexts/SocketContext.tsx";
import "./index.css";
import App from "./App.tsx";

const root = document.getElementById("root");
createRoot(root!).render(
  <SocketProvider>
    <App />
  </SocketProvider>,
);
