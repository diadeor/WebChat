import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": "https://webchat-production-b89a.up.railway.app",
    },
    host: "0.0.0.0",
    port: 5173, // or your custom port
  },
  plugins: [react(), tailwindcss()],
});
