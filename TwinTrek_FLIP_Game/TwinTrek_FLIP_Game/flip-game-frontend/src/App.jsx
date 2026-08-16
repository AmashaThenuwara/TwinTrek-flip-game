import { useState, useEffect } from "react";
import { api } from "./api/client";
import Leaderboard from "./components/Leaderboard";
import GameBoard from "./components/GameBoard";
import Scoreboard from "./components/Scoreboard";
import { beep } from "./utils/audio";

/**
 * Main Application Component
 * Manages the global state of the game including the current session,
 * deck, score, timer, and whether the game is completed or failed.
 */
export default function App() {
    const [session, setSession] = useState(null);
    const [deck, setDeck] = useState([]);
    const [moves, setMoves] = useState(0);
    const [score, setScore] = useState(0);
    const [combo, setCombo] = useState(0); // Added Combo state
    const [matched, setMatched] = useState(new Set());
    const [gameCompleted, setGameCompleted] = useState(false);

    const [timeRemaining, setTimeRemaining] = useState(0);
    const [gameFailed, setGameFailed] = useState(false);
    const [soundOn, setSoundOn] = useState(true);

    /**
     * Timer logic
     * Decrements the timeRemaining every second while a game session is active.
     * Triggers game failure if time reaches 0.
     */
    // Timer logic
    useEffect(() => {
        if (session && !gameCompleted && !gameFailed && timeRemaining > 0) {
            const timer = setInterval(() => {
                setTimeRemaining(prev => {
                    if (prev <= 1) {
                        setGameFailed(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [session, gameCompleted, gameFailed, timeRemaining]);

    /**
     * Confetti logic
     * Spawns confetti elements across the screen when the player wins the game (gameCompleted = true).
     */
    // Confetti logic
    useEffect(() => {
        if (gameCompleted) {
            const colors = ['#ec4899', '#a855f7', '#facc15', '#38bdf8']; // Galaxy colors
            const flakes = [];
            for (let i = 0; i < 60; i++) {
                const el = document.createElement('div');
                el.className = 'confetti';
                el.style.left = Math.random() * 100 + 'vw';
                el.style.background = colors[Math.floor(Math.random() * colors.length)];
                el.style.animationDuration = (Math.random() * 1.5 + 1.8) + 's';
                el.style.opacity = Math.random() * 0.6 + 0.4;
                document.body.appendChild(el);
                flakes.push(el);
                setTimeout(() => {
                    if (document.body.contains(el)) el.remove();
                }, 3600);
            }
            return () => {
                flakes.forEach(el => {
                    if (document.body.contains(el)) el.remove();
                });
            };
        }
    }, [gameCompleted]);

    if (!session) {
        // Show homepage until game starts
        return (
            <Leaderboard
                onStart={({ sessionId, deck }) => {
                    setSession(sessionId);
                    setDeck(deck);
                    setMoves(0);
                    setScore(0);
                    setCombo(0);
                    setMatched(new Set());
                    setGameCompleted(false);
                    setGameFailed(false);
                    
                    // Set time limit based on level (deck size)
                    if (deck.length === 16) setTimeRemaining(60);       // Casual
                    else if (deck.length === 36) setTimeRemaining(120); // Medium
                    else if (deck.length === 64) setTimeRemaining(240); // Hard
                    else setTimeRemaining(60);
                }}
            />
        );
    }

    // Calculate stars
    let stars = 1;
    if (gameCompleted) {
        const parMoves = deck.length * 1.5;
        if (moves <= parMoves) stars = 3;
        else if (moves <= parMoves * 1.5) stars = 2;
    }

    const handleRestart = async () => {
        const authedId = localStorage.getItem("playerId");
        const playerId = (authedId && authedId !== "undefined" && authedId !== "null") ? Number(authedId) : 1;
        
        let difficulty = "CASUAL";
        if (deck.length === 36) difficulty = "MEDIUM";
        else if (deck.length === 64) difficulty = "HARD";
        
        try {
            const resp = await api.post("/game/start", {
                playerId,
                difficulty,
                aiEnabled: false,
            });
            
            setSession(resp.sessionId);
            setDeck(resp.imageNames);
            setMoves(0);
            setScore(0);
            setCombo(0);
            setMatched(new Set());
            setGameCompleted(false);
            setGameFailed(false);
            
            if (resp.imageNames.length === 16) setTimeRemaining(60);
            else if (resp.imageNames.length === 36) setTimeRemaining(120);
            else if (resp.imageNames.length === 64) setTimeRemaining(240);
            else setTimeRemaining(60);
        } catch (error) {
            console.error("Error restarting game:", error);
            alert("Failed to restart game.");
        }
    };

    // Show game board once session is active
    
    const authedId = localStorage.getItem("playerId");
    const authedName = localStorage.getItem("username");
    const authedAvatar = localStorage.getItem("avatar") || '🦄';

    return (
        <div className="min-h-screen flex flex-col lg:flex-row items-center justify-center p-4 sm:p-8 w-full relative z-10 overflow-hidden gap-8 lg:gap-16">
            
            {/* Dedicated Main Menu Button */}
            <button 
                className="absolute top-4 left-4 z-50 flex items-center gap-2 bg-[#1a132b]/80 backdrop-blur-md border border-cyan-500/30 pl-3 pr-4 py-2 rounded-full cursor-pointer shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:bg-cyan-900/50 hover:border-cyan-400/50 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all text-cyan-100"
                onClick={() => setSession(null)}
                title="Back to Menu"
            >
                <span className="text-xl drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">🔙</span>
                <span className="font-bold text-sm tracking-widest uppercase mt-0.5">Menu</span>
            </button>

            {/* Topbar User Chip in Game View */}
            {(authedId && authedId !== "undefined" && authedId !== "null") && (
                <div 
                    className="absolute top-4 right-4 z-50 flex items-center gap-3 bg-[#1a132b]/80 backdrop-blur-md border border-purple-500/30 pl-2 pr-4 py-2 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                >
                    <div className="w-10 h-10 bg-[#0f0b1a] rounded-full flex items-center justify-center text-xl shadow-inner border border-purple-500/20">
                        {authedAvatar}
                    </div>
                    <span className="font-bold text-sm tracking-wider text-purple-100">{authedName && authedName !== "undefined" ? authedName : "Player"}</span>
                </div>
            )}

            {/* Stats Panel & Controls (Left on Desktop, Top/Bottom split on Mobile) */}
            <div className="flex flex-col gap-4 lg:gap-6 w-full lg:w-auto lg:min-w-[200px] z-20 order-1">
                
                {/* Stats Row (Mobile) / Col (Desktop) */}
                <div className="flex flex-row lg:flex-col gap-2 lg:gap-6 w-full justify-around lg:justify-center">
                    {/* Timer Card */}
                    <div className={`flex-1 lg:flex-none flex flex-col items-center justify-center gap-1 px-2 py-3 lg:py-6 rounded-3xl bg-black/40 backdrop-blur-md border ${timeRemaining <= 10 ? 'border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.5)] text-red-400 animate-pulse' : 'border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.3)] text-purple-200'}`}>
                        <span className="text-xl lg:text-3xl">⏱️</span>
                        <span className="text-2xl lg:text-4xl font-black tracking-widest leading-none mt-1 lg:mt-2">{Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}</span>
                        <span className="text-[0.55rem] lg:text-xs uppercase tracking-widest font-bold opacity-80 mt-1">TIME LEFT</span>
                    </div>
                    
                    {/* Score, Streak & Moves Card */}
                    <div className="flex-[2] lg:flex-none bg-purple-900/40 border border-purple-500/30 p-2 lg:p-6 rounded-3xl shadow-[0_0_20px_rgba(167,139,250,0.2)] backdrop-blur-md flex flex-row lg:flex-col justify-around gap-2 lg:gap-6">
                        <div className="flex flex-col items-center justify-center">
                            <span className="text-pink-400 text-[0.55rem] lg:text-xs font-black tracking-widest mb-1">SCORE</span> 
                            <span className="text-white text-xl lg:text-4xl font-black leading-none">{score}</span>
                        </div>
                        <div className="hidden lg:block w-full h-[1px] bg-purple-500/30"></div>
                        <div className="w-[1px] h-full lg:hidden bg-purple-500/30"></div>
                        <div className="flex flex-col items-center justify-center">
                            <span className="text-yellow-400 text-[0.55rem] lg:text-xs font-black tracking-widest mb-1">STREAK</span> 
                            <span className="text-yellow-300 text-xl lg:text-4xl font-black leading-none">{combo}x</span>
                        </div>
                        <div className="hidden lg:block w-full h-[1px] bg-purple-500/30"></div>
                        <div className="w-[1px] h-full lg:hidden bg-purple-500/30"></div>
                        <div className="flex flex-col items-center justify-center">
                            <span className="text-purple-300 text-[0.55rem] lg:text-xs font-black tracking-widest mb-1">MOVES</span> 
                            <span className="text-white text-xl lg:text-4xl font-black leading-none">{moves}</span>
                        </div>
                    </div>
                </div>

                {/* Controls (Desktop Only) */}
                <div className="hidden lg:flex flex-col gap-3 z-50">
                    <button 
                        onClick={() => setSoundOn(!soundOn)}
                        className="w-full bg-[#1a132b]/80 p-4 flex items-center justify-center gap-3 text-purple-200 btn-super text-pink-400 ring-2 ring-purple-500/50"
                    >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${soundOn ? 'bg-purple-500/20 text-purple-300' : 'bg-red-500/20 text-red-400'} transition-colors`}>
                            <span className="text-lg">{soundOn ? '🔊' : '🔇'}</span>
                        </div>
                        <span className="text-xs font-black tracking-widest uppercase">Sound {soundOn ? 'On' : 'Off'}</span>
                    </button>
                    <button 
                        onClick={handleRestart}
                        className="w-full p-6 flex items-center justify-center gap-4 text-lg btn-shiny btn-super btn-colorful"
                    >
                        <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                            <span className="text-lg drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">🔄</span>
                        </div>
                        <span className="text-xs font-black tracking-widest uppercase drop-shadow-md">Refresh</span>
                    </button>
                </div>
            </div>
            
            {/* Right Side: Game Board */}
            <div className="flex-1 flex flex-col justify-center items-center w-full max-w-3xl relative z-10 mb-2 lg:mb-0 order-2">
                <GameBoard
                    deck={deck}
                    matched={matched}
                    sessionId={session}
                    soundOn={soundOn}
                    onFlipResult={({ match, newScore, moves: backendMoves, gameCompleted: backendComplete, a, b }) => {
                        if (gameFailed) return;
                        setScore(newScore);
                        setMoves(backendMoves);
                        if (match) {
                            setMatched(prev => new Set([...prev, a, b]));
                            setCombo(prev => prev + 1);
                            beep(760, 0.12, 'sine', soundOn); // Match sound
                        } else {
                            setCombo(0);
                            beep(180, 0.15, 'sawtooth', soundOn); // Mismatch sound
                        }
                        if (backendComplete) setGameCompleted(true);
                    }}
                    onBack={() => setSession(null)}
                />
            </div>

            {/* Controls (Mobile Only) - Displayed below the game board */}
            <div className="flex lg:hidden flex-row flex-wrap w-full gap-4 justify-center order-3 z-50 mt-4 mb-12 px-4">
                <button 
                    onClick={() => setSoundOn(!soundOn)}
                    className="flex-1 bg-[#1a132b] py-6 px-4 rounded-[2rem] flex flex-col sm:flex-row items-center justify-center gap-3 text-purple-200 border-b-[6px] border-black/50 text-pink-400 shadow-[0_0_20px_rgba(0,0,0,0.5)] active:border-b-0 active:translate-y-[6px] transition-all hover:bg-purple-900/80"
                >
                    <span className="text-3xl sm:text-2xl drop-shadow-md">{soundOn ? '🔊' : '🔇'}</span>
                    <span className="text-xs sm:text-sm font-black tracking-widest uppercase">Sound</span>
                </button>
                <button 
                    onClick={handleRestart}
                    className="flex-[1.2] py-6 px-4 rounded-[2rem] flex flex-col sm:flex-row items-center justify-center gap-3 text-white btn-colorful border-b-[6px] border-black/50 shadow-[0_0_20px_rgba(236,72,153,0.4)] active:border-b-0 active:translate-y-[6px] transition-all"
                >
                    <span className="text-3xl sm:text-2xl drop-shadow-md">🔄</span>
                    <span className="text-xs sm:text-sm font-black tracking-widest uppercase drop-shadow-md">Refresh</span>
                </button>
            </div>

            {/* Level Complete / Failed Modals */}
            {(gameCompleted || gameFailed) && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4 backdrop-blur-xl">
                    <div className="bg-[#0f0b1a]/90 p-8 sm:p-10 rounded-[32px] shadow-[0_0_50px_rgba(219,39,119,0.5)] text-center max-w-sm w-full border border-purple-500/30 relative overflow-hidden flex flex-col items-center">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-pink-500/10 to-purple-500/10 pointer-events-none"></div>
                        
                        {gameCompleted ? (
                            <>
                                <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(219,39,119,0.6)] border-4 border-[#0f0b1a]">
                                    <span className="text-4xl">🏆</span>
                                </div>
                                <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-300 mb-1 drop-shadow-lg relative z-10 tracking-widest uppercase">Victory</h2>
                                <p className="text-purple-300/80 text-sm mb-6 font-bold relative z-10 uppercase tracking-widest">Galaxy Conquered</p>
                                
                                <div className="flex justify-center space-x-3 mb-8 relative z-10">
                                    {[1, 2, 3].map(s => (
                                        <div key={s} className={`w-12 h-12 flex items-center justify-center rounded-full ${s <= stars ? 'bg-yellow-400/20 border border-yellow-400/50 shadow-[0_0_15px_rgba(250,204,21,0.5)]' : 'bg-purple-900/30 border border-purple-500/20'} transition-all`}>
                                            <span className={`text-2xl ${s <= stars ? 'text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)] scale-110' : 'text-purple-700'} transition-transform`}>
                                                ★
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="w-full grid grid-cols-3 gap-2 mb-8 relative z-10">
                                    <div className="bg-[#1a132b] p-3 rounded-2xl border border-purple-500/20 flex flex-col items-center justify-center">
                                        <span className="text-pink-400 text-[0.6rem] font-black tracking-widest uppercase mb-1">Score</span>
                                        <span className="text-white font-black text-lg">{score}</span>
                                    </div>
                                    <div className="bg-[#1a132b] p-3 rounded-2xl border border-purple-500/20 flex flex-col items-center justify-center">
                                        <span className="text-purple-300 text-[0.6rem] font-black tracking-widest uppercase mb-1">Moves</span>
                                        <span className="text-white font-black text-lg">{moves}</span>
                                    </div>
                                    <div className="bg-[#1a132b] p-3 rounded-2xl border border-purple-500/20 flex flex-col items-center justify-center">
                                        <span className="text-cyan-400 text-[0.6rem] font-black tracking-widest uppercase mb-1">Time</span>
                                        <span className="text-white font-black text-lg">{timeRemaining}s</span>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-600 rounded-full flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(239,68,68,0.6)] border-4 border-[#0f0b1a]">
                                    <span className="text-4xl">💀</span>
                                </div>
                                <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-300 mb-1 drop-shadow-lg relative z-10 tracking-widest uppercase">Failed</h2>
                                <p className="text-red-300/80 text-sm mb-8 font-bold relative z-10 uppercase tracking-widest">Lost in Space</p>
                            </>
                        )}
                        
                        <div className="flex flex-col gap-3 w-full mt-6 z-10">
                            <button 
                                className="w-full py-5 btn-super btn-shiny btn-colorful text-2xl"
                                onClick={handleRestart}
                            >
                                PLAY AGAIN
                            </button>
                            <button 
                                className="w-full py-4 btn-super text-lg bg-[#1a132b] text-purple-300 border border-purple-500/30 hover:bg-purple-900/50 hover:text-white"
                                onClick={() => setSession(null)}
                            >
                                MAIN MENU
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
