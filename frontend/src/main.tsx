import { createRoot } from "react-dom/client";
import SocketProvider from "./contexts/SocketContext.tsx";
import "./index.css";
import App from "./App.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AuthProvider from "./contexts/AuthContext.tsx";

const root = document.getElementById("root");
createRoot(root!).render(
  <GoogleOAuthProvider clientId="25488743017-mvo02kpmbl5rtto3tds3eli6kgv0ga18.apps.googleusercontent.com">
    <AuthProvider>
      <SocketProvider>
        <App />
      </SocketProvider>
    </AuthProvider>
  </GoogleOAuthProvider>,
);
