import { api } from "../api/client";
import { useState } from "react";

export default function Settings({ onStart }) {
    const [playerId, setPlayerId] = useState(Number(localStorage.getItem("playerId")) || 1);
    const [difficulty, setDifficulty] = useState("EASY");
    const [aiEnabled, setAiEnabled] = useState(false);

    const startGame = async () => {
        try {
            const resp = await api.post("/game/start", { playerId, difficulty, aiEnabled });
            onStart({ sessionId: resp.sessionId, deck: resp.deck });
        } catch (err) {
            console.error("Error starting game:", err);
            alert("Failed to start game. Please try again.");
        }
    };

    return (
        <div className="bg-slate-800 p-4 rounded flex gap-3 items-center">
            <input
                className="bg-slate-700 p-2 rounded"
                type="number"
                value={playerId}
                onChange={e => setPlayerId(Number(e.target.value))}
                placeholder="Player ID"
            />
            <select
                className="bg-slate-700 p-2 rounded"
                value={difficulty}
                onChange={e => setDifficulty(e.target.value)}
            >
                <option>EASY</option>
                <option>MEDIUM</option>
                <option>HARD</option>
            </select>
            <label className="flex items-center gap-2">
                <input
                    type="checkbox"
                    checked={aiEnabled}
                    onChange={e => setAiEnabled(e.target.checked)}
                />
                AI Opponent
            </label>
            <button className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded" onClick={startGame}>
                Start
            </button>
        </div>
    );
}
