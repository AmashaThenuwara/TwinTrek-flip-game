import { useNavigate } from "react-router-dom";

export default function Instructions() {
    const navigate = useNavigate();

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

            <div className="w-full max-w-[600px] bg-[#0f0b1a]/90 backdrop-blur-xl border border-purple-500/20 p-8 sm:p-10 rounded-[32px] shadow-[0_0_50px_rgba(34,211,238,0.3)] relative z-10 flex flex-col items-center">
                
                <h1 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-300 mb-2 drop-shadow-lg uppercase tracking-widest text-center">
                    How to Play
                </h1>
                <p className="text-cyan-300/80 text-sm mb-10 font-bold uppercase tracking-widest text-center">
                    TwinTrek Rules
                </p>

                <div className="w-full flex flex-col gap-6">
                    <div className="flex items-center gap-6 group bg-black/40 p-5 rounded-2xl border border-cyan-500/30 hover:bg-cyan-900/40 transition-all hover:scale-[1.02] shadow-inner">
                        <div className="w-16 h-16 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0 border border-cyan-400/30 group-hover:bg-cyan-500/30 transition-all shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                            <span className="text-pink-400 text-3xl drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]">✨</span>
                        </div>
                        <div className="flex flex-col text-left">
                            <span className="text-lg text-cyan-100 font-black uppercase tracking-widest group-hover:text-cyan-300 transition-colors">Tap to flip</span>
                            <span className="text-sm text-white/70 font-medium mt-1">Memorize the cards and find 2 identical pairs to clear them from the board.</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-6 group bg-black/40 p-5 rounded-2xl border border-purple-500/30 hover:bg-purple-900/40 transition-all hover:scale-[1.02] shadow-inner">
                        <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0 border border-purple-400/30 group-hover:bg-purple-500/30 transition-all shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                            <span className="text-yellow-400 text-3xl drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]">⏱️</span>
                        </div>
                        <div className="flex flex-col text-left">
                            <span className="text-lg text-purple-100 font-black uppercase tracking-widest group-hover:text-purple-300 transition-colors">Match fast</span>
                            <span className="text-sm text-white/70 font-medium mt-1">Beat the ticking clock. If time runs out, the game is over! Keep your streak alive for bonuses.</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-6 group bg-black/40 p-5 rounded-2xl border border-pink-500/30 hover:bg-pink-900/40 transition-all hover:scale-[1.02] shadow-inner">
                        <div className="w-16 h-16 rounded-full bg-pink-500/20 flex items-center justify-center shrink-0 border border-pink-400/30 group-hover:bg-pink-500/30 transition-all shadow-[0_0_15px_rgba(236,72,153,0.2)]">
                            <span className="text-cyan-400 text-3xl drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">⭐</span>
                        </div>
                        <div className="flex flex-col text-left">
                            <span className="text-lg text-pink-100 font-black uppercase tracking-widest group-hover:text-pink-300 transition-colors">Earn stars</span>
                            <span className="text-sm text-white/70 font-medium mt-1">Finish the board with the fewest possible moves to earn a perfect 3-star rating!</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
