// import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar.tsx";
import WebApp from "./pages/WebApp.tsx";
import Login from "./pages/Login.tsx";

function App() {
  return (
    <Router>
      <main className=" home-container w-full max-w-6xl flex flex-col items-center h-svh px-5">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <NavBar />
                <Home />
              </>
            }
          />
          <Route path="/app/*" element={<WebApp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
