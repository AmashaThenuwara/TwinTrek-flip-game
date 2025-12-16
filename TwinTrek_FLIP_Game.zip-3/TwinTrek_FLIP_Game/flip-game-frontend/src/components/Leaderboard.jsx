import { useState } from "react";
import { api } from "../api/client";
import { useNavigate } from "react-router-dom";

export default function Leaderboard({ onStart }) {
    const navigate = useNavigate();
    const [view, setView] = useState(null);
    const [difficulty, setDifficulty] = useState("EASY");
    const [playerId, setPlayerId] = useState(Number(localStorage.getItem("playerId")) || 1);
    const authedId = Number(localStorage.getItem("playerId"));
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
            // resp is already res.data from axios
            onStart({ sessionId: resp.sessionId, deck: resp.deck });
        } catch (error) {
            console.error("Error starting game:", error);
            alert("Failed to start game. Please try again.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-screen bg-gradient-to-br from-blue-900 to-black text-white">
            <button
                className="signin-button"
                onClick={() => {
                    if (authedId) navigate("/profile");
                    else navigate("/login");
                }}
            >
                {authedId ? `Profile: ${authedName}` : "Sign In"}
            </button>

            <h1 className="glow-title">TwinTrek</h1>
            <p className="subtitle">A journey to find matching twins</p>

            <div className="leaderboard-grid">
                {/* F */}
                <div className="tile cursor-pointer" onClick={() => setView(view === "figures" ? null : "figures")}>
                    {view === "figures" ? (
                        <>
                            <h2 className="text-xl mb-2">🎲 Figures</h2>
                            <p className="text-sm text-center mb-4">
                                Design decks, visuals and items for the game.
                            </p>
                            <button onClick={() => setView(null)}>Back</button>
                        </>
                    ) : (
                        <>
                            <h1>F</h1>
                            <span className="text-sm font-normal">FIGURES</span>
                        </>
                    )}
                </div>

                {/* L */}
                <div className="tile cursor-pointer" onClick={() => setView(view === "levels" ? null : "levels")}>
                    {view === "levels" ? (
                        <>
                            <h2 className="text-xl mb-2">🎚 Select Level</h2>
                            <select
                                className="bg-slate-700 p-2 rounded text-sm mb-2"
                                value={difficulty}
                                onChange={(e) => setDifficulty(e.target.value)}
                            >
                                <option>EASY</option>
                                <option>MEDIUM</option>
                                <option>HARD</option>
                            </select>
                            <input
                                className="bg-slate-700 p-2 rounded text-sm mb-2"
                                type="number"
                                value={playerId}
                                onChange={(e) => setPlayerId(Number(e.target.value))}
                                placeholder="Player ID"
                            />
                            <button onClick={() => setView(null)}>Back</button>
                        </>
                    ) : (
                        <>
                            <h1>L</h1>
                            <span className="text-sm font-normal">LEVELS</span>
                        </>
                    )}
                </div>

                {/* I */}
                <div className="tile cursor-pointer" onClick={() => setView(view === "instructions" ? null : "instructions")}>
                    {view === "instructions" ? (
                        <>
                            <h2 className="text-xl mb-2">📜 Instructions</h2>
                            <p className="text-sm text-center mb-4">
                                Flip two cards to find matches. Score increases with combos!
                            </p>
                            <button onClick={() => setView(null)}>Back</button>
                        </>
                    ) : (
                        <>
                            <h1>I</h1>
                            <span className="text-sm font-normal">INSTRUCTIONS</span>
                        </>
                    )}
                </div>

                {/* P */}
                <div className="tile cursor-pointer" onClick={() => setView(view === "play" ? null : "play")}>
                    {view === "play" ? (
                        <>
                            <h2 className="text-xl mb-2">▶️ Ready to Play</h2>
                            <p className="text-sm text-center mb-4">
                                Start the game using your selected level and player ID.
                            </p>
                            <button onClick={startGame}>Play Now</button>
                            <button onClick={() => setView(null)}>Back</button>
                        </>
                    ) : (
                        <>
                            <h1>P</h1>
                            <span className="text-sm font-normal">PLAY</span>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
