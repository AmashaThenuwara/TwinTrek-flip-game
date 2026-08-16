import { useState, useEffect } from "react";
import { api } from "../api/client";
import { useNavigate } from "react-router-dom";

export default function Figures() {
    const navigate = useNavigate();
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/api/leaderboard")
            .then((data) => {
                setLeaderboardData(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Failed to fetch leaderboard", error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center p-4 sm:p-8 w-full relative z-10 overflow-hidden text-white font-sans">
            {/* Top Left Back Button */}
            <button 
                onClick={() => navigate("/")}
                className="absolute top-6 left-6 z-50 w-12 h-12 rounded-full bg-purple-900/40 border border-purple-500/30 flex items-center justify-center text-purple-200 hover:bg-purple-500/20 hover:text-white transition-colors backdrop-blur-md"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
            </button>

            <div className="w-full max-w-[600px] bg-[#0f0b1a]/90 backdrop-blur-xl border border-purple-500/20 p-8 sm:p-10 rounded-[32px] shadow-[0_0_50px_rgba(236,72,153,0.3)] relative z-10 flex flex-col items-center">
                
                <h1 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-300 mb-2 drop-shadow-lg uppercase tracking-widest text-center">
                    Top Players
                </h1>
                <p className="text-purple-300/80 text-sm mb-8 font-bold uppercase tracking-widest text-center">
                    Galaxy Leaderboard
                </p>

                <div className="w-full max-h-[60vh] overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                    {loading ? (
                        <div className="text-center text-purple-300 mt-4 animate-pulse font-bold">Loading records...</div>
                    ) : leaderboardData.length === 0 ? (
                        <div className="text-center text-purple-300 mt-4 font-bold">No scores yet</div>
                    ) : (
                        leaderboardData.map((entry, idx) => (
                            <div 
                                key={idx} 
                                className="flex justify-between items-center bg-black/40 p-4 rounded-2xl border border-pink-500/30 cursor-pointer hover:bg-pink-500/20 transition-all hover:scale-[1.02] shadow-inner" 
                                onClick={() => navigate(`/profile?playerId=${entry.playerId}`)}
                            >
                                <div className="flex items-center gap-4 overflow-hidden">
                                    <span className={`w-8 h-8 flex items-center justify-center rounded-full font-black text-sm ${idx === 0 ? 'bg-yellow-400 text-black shadow-[0_0_15px_rgba(250,204,21,0.6)]' : idx === 1 ? 'bg-gray-300 text-black shadow-[0_0_15px_rgba(209,213,219,0.6)]' : idx === 2 ? 'bg-amber-700 text-white shadow-[0_0_15px_rgba(180,83,9,0.6)]' : 'bg-white/10 text-white border border-white/20'}`}>
                                        {idx + 1}
                                    </span>
                                    <span className="text-purple-100 font-bold text-lg truncate">
                                        {entry.playerName || `Player ${entry.playerId}`}
                                    </span>
                                </div>
                                <span className="text-pink-300 font-black text-xl tracking-wider">
                                    {entry.score}
                                </span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
