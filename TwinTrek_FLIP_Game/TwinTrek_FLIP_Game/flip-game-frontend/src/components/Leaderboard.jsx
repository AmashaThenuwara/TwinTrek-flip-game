import { useState } from "react";
import { api } from "../api/client";
import { useNavigate } from "react-router-dom";

/**
 * Leaderboard Component
 * Acts as the main menu and landing page. Handles displaying top players,
 * selecting difficulty level, showing instructions, and starting the game.
 */
export default function Leaderboard({ onStart }) {
    const navigate = useNavigate();
    const [showLevelSelect, setShowLevelSelect] = useState(false);
    const [difficulty, setDifficulty] = useState("CASUAL");
    
    const authedIdStr = localStorage.getItem("playerId");
    const authedId = authedIdStr && authedIdStr !== "undefined" && authedIdStr !== "null" ? Number(authedIdStr) : null;
    const [playerId, setPlayerId] = useState(authedId || 1);
    const authedName = localStorage.getItem("username");

    const startGame = async () => {
        if (!difficulty || !playerId) {
            alert("Please select a level and enter a player ID first!");
            return;
        }
        try {
            const resp = await api.post("/game/start", {
                playerId,
                difficulty,
                aiEnabled: false,
            });
            onStart({ sessionId: resp.sessionId, deck: resp.imageNames });
        } catch (error) {
            console.error("Error starting game:", error);
            alert("Failed to start game. Please try again.");
        }
    };

    const authedAvatar = localStorage.getItem("avatar") || '👤';

    return (
        <div 
            className="flex flex-col items-center justify-center min-h-screen w-screen bg-transparent text-white relative z-10"
            onClick={() => {
                setShowLevelSelect(false);
            }}
        >
            {/* Topbar User Chip */}
            {authedId && (
                <div 
                    className="absolute top-4 left-4 z-50 flex items-center gap-3 bg-[#1a132b]/80 backdrop-blur-md border border-purple-500/30 pl-2 pr-4 py-2 rounded-full cursor-pointer shadow-[0_0_15px_rgba(168,85,247,0.2)] hover:bg-purple-900/50 hover:border-pink-500/50 hover:shadow-[0_0_20px_rgba(236,72,153,0.4)] transition-all"
                    onClick={(e) => { e.stopPropagation(); navigate("/profile"); }}
                >
                    <div className="w-10 h-10 bg-[#0f0b1a] rounded-full flex items-center justify-center text-xl shadow-inner border border-purple-500/20">
                        {authedAvatar}
                    </div>
                    <span className="font-bold text-sm tracking-wider text-purple-100">{authedName}</span>
                </div>
            )}

            <button
                className="signin-button btn-super btn-shiny btn-colorful"
                onClick={(e) => {
                    e.stopPropagation();
                    if (authedId) {
                        localStorage.removeItem("playerId");
                        localStorage.removeItem("username");
                        localStorage.removeItem("token");
                        import("../api/client").then(module => module.setToken(null));
                        window.location.reload();
                    } else {
                        navigate("/login");
                    }
                }}
            >
                {authedId ? "SIGN OUT" : "SIGN IN"}
            </button>

            <div className="block-container">
                <h1 className="glow-title">TwinTrek</h1>
                <p className="subtitle">Explore the matching galaxy</p>

                {/* F.L.I.P grid */}
                <div className="leaderboard-grid">
                    {/* F - Figures (Stats) */}
                    <div 
                        className="tile" 
                        onClick={(e) => { 
                            e.stopPropagation();
                            navigate("/figures");
                        }}
                    >
                        <h1 className="text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)] font-black">F</h1>
                        <span className="text-purple-200">FIGURES</span>
                    </div>

                    {/* L - Level */}
                    <div
                        className={`tile ${showLevelSelect ? 'border-yellow-400 bg-purple-900/80 shadow-[0_0_20px_rgba(250,204,21,0.3)]' : ''}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            if (!showLevelSelect) {
                                setShowLevelSelect(true);
                            } else {
                                setShowLevelSelect(false);
                            }
                        }}
                    >
                        {showLevelSelect ? (
                            <div onClick={(e) => e.stopPropagation()} className="w-full h-full flex flex-col justify-center items-center p-2 relative z-10">
                                <div className="flex flex-col gap-4 w-full mt-1 px-2">
                                    {["CASUAL", "MEDIUM", "HARD"].map((level) => {
                                        let bgClass = "";
                                        if (level === "CASUAL") bgClass = "bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.6)]";
                                        if (level === "MEDIUM") bgClass = "bg-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.6)]";
                                        if (level === "HARD") bgClass = "bg-pink-600 shadow-[0_0_20px_rgba(219,39,119,0.6)]";

                                        const isSelected = difficulty === level;
                                        return (
                                            <button 
                                                key={level}
                                                className={`w-[90%] mx-auto rounded-[1.5rem] py-2 px-2 text-sm font-black tracking-widest uppercase transition-all transform hover:-translate-y-1 text-white border-b-[4px] border-black/40 active:border-b-0 active:translate-y-1 ${bgClass} ${isSelected ? 'ring-2 ring-white scale-110 z-10' : 'opacity-90 hover:opacity-100 hover:scale-105'}`}
                                                onClick={() => { setDifficulty(level); setShowLevelSelect(false); }}
                                            >
                                                {level}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        ) : (
                            <>
                                <h1 className="text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)] font-black">L</h1>
                                <span className="text-purple-200">LEVEL</span>
                            </>
                        )}
                    </div>

                    {/* I - Instructions */}
                    <div 
                        className="tile" 
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate("/instructions");
                        }}
                    >
                        <h1 className="text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)] font-black">I</h1>
                        <span className="text-purple-200">INSTRUCTIONS</span>
                    </div>

                    {/* P - Play */}
                    <div
                        className="tile border-yellow-500/50 hover:border-yellow-400 bg-gradient-to-br from-purple-900/60 to-pink-900/60"
                        onClick={(e) => {
                            e.stopPropagation();
                            startGame();
                        }}
                    >
                        <h1 className="text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)] font-black">P</h1>
                        <span className="text-yellow-200 text-xl tracking-wider font-black">PLAY NOW</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
