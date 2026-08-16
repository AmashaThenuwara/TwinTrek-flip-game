export default function Scoreboard({ moves, score }) {
    return (
        <div className="bg-purple-900/40 border border-purple-500/30 p-3 px-6 rounded-full flex gap-8 shadow-[0_0_15px_rgba(167,139,250,0.2)] backdrop-blur-md">
            <div className="font-bold tracking-wider"><span className="text-purple-300">MOVES:</span> <span className="text-white text-lg">{moves}</span></div>
            <div className="font-bold tracking-wider"><span className="text-pink-400">SCORE:</span> <span className="text-white text-lg">{score}</span></div>
        </div>
    );
}
