export default function Scoreboard({ moves, score }) {
    return (
        <div className="bg-slate-800 p-4 rounded flex gap-6">
            <div><span className="text-slate-300">Moves:</span> {moves}</div>
            <div><span className="text-slate-300">Score:</span> {score}</div>
        </div>
    );
}
