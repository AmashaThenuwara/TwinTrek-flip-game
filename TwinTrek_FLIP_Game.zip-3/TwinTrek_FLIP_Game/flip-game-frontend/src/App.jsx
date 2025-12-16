import { useState } from "react";
import Leaderboard from "./components/Leaderboard";
import GameBoard from "./components/GameBoard";
import Scoreboard from "./components/Scoreboard";

export default function App() {
    const [session, setSession] = useState(null);
    const [deck, setDeck] = useState([]);
    const [moves, setMoves] = useState(0);
    const [score, setScore] = useState(0);
    const [matched, setMatched] = useState(new Set());
    const [gameCompleted, setGameCompleted] = useState(false);

    if (!session) {
        // Show homepage until game starts
        return (
            <Leaderboard
                onStart={({ sessionId, deck }) => {
                    setSession(sessionId);
                    setDeck(deck);
                    setMoves(0);
                    setScore(0);
                    setMatched(new Set());
                    setGameCompleted(false);
                }}
            />
        );
    }

    // Show game board once session is active
    return (
        <div className="p-6 space-y-4">
            <Scoreboard moves={moves} score={score} />
            <GameBoard
                deck={deck}
                matched={matched}
                sessionId={session}
                onFlipResult={({ match, newScore, moves, gameCompleted, a, b }) => {
                    setScore(newScore);
                    setMoves(moves);
                    if (match) setMatched(prev => new Set([...prev, a, b]));
                    if (gameCompleted) setGameCompleted(true);
                }}
                onBack={() => setSession(null)}   // ✅ reset session to go back to Leaderboard
            />

            {gameCompleted && (
                <div className="text-center text-2xl text-green-400 mt-4">
                    🎉 Game Over! You matched all cards.
                </div>
            )}
        </div>
    );
}
