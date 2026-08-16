import { useState, useEffect } from "react";
import { api } from "../api/client";
import Card from "./Card";
import { beep } from "../utils/audio";

export default function GameBoard({ deck, matched, sessionId, soundOn, onFlipResult, onBack }) {
    const [flipped, setFlipped] = useState([]);
    const [mismatched, setMismatched] = useState([]);
    const [lock, setLock] = useState(false);

    useEffect(() => {
        setFlipped([]);
        setMismatched([]);
        setLock(false);
    }, [deck]);

    const handleFlip = async (index, value) => {
        if (lock) return;
        if (flipped.includes(index) || matched.has(index)) return;

        beep(520, 0.08, 'triangle', soundOn); // Flip sound

        const next = [...flipped, index];
        setFlipped(next);

        if (next.length === 2) {
            setLock(true);
            const [a, b] = next;

            try {
                const data = await api.post("/game/flip", {
                    sessionId,
                    firstIndex: a,
                    secondIndex: b
                });

                onFlipResult({ ...data, a, b });
                
                if (!data.match) {
                    setMismatched([a, b]);
                }
            } finally {
                setTimeout(() => {
                    setFlipped([]);
                    setMismatched([]);
                    setLock(false);
                }, 600);
            }
        }
    };

    const size = deck.length;
    const cols = Math.ceil(Math.sqrt(size));

    return (
        <div className="flex flex-col h-full w-full justify-center items-center flex-1 gap-10 sm:gap-14">
            <div
                className="grid gap-2 sm:gap-3 mx-auto justify-center"
                style={{ 
                    gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                    width: "100%",
                    maxWidth: "min(90vw, 70vh)", // Ensure it fits both mobile width and PC height
                }}
            >
                {deck.map((value, index) => (
                    <Card
                        key={index}
                        index={index}
                        value={value}
                        flipped={flipped.includes(index)}
                        matched={matched.has(index)}
                        mismatched={mismatched.includes(index)}
                        onClick={handleFlip}
                    />
                ))}
            </div>

        </div>
    );
}