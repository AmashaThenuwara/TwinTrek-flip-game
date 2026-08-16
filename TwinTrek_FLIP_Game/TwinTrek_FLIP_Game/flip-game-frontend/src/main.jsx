import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";     // match folder casing!
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";
import Figures from "./Pages/Figures";
import Instructions from "./Pages/Instructions";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/figures" element={<Figures />} />
                <Route path="/instructions" element={<Instructions />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>
);

// Force rebuild

// Trigger reload for back button placement

// Force Vite reload
