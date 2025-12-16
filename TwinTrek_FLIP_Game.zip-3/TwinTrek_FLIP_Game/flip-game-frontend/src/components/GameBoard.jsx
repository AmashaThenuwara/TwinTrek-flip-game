import { useState, useEffect } from "react";
import { api } from "../api/client";
import Card from "./Card";

export default function GameBoard({ deck, matched, sessionId, onFlipResult, onBack }) {
    const [flipped, setFlipped] = useState([]);
    const [lock, setLock] = useState(false);

    useEffect(() => {
        setFlipped([]);
        setLock(false);
    }, [deck]);

    const handleFlip = async (index, value) => {
        if (lock) return;
        if (flipped.includes(index) || matched.has(index)) return;

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
            } finally {
                setTimeout(() => {
                    setFlipped([]);
                    setLock(false);
                }, 600);
            }
        }
    };

    const size = deck.length;
    const cols = Math.ceil(Math.sqrt(size));

    return (
        <div className="space-y-4">
            <div
                className="grid gap-3"
                style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
            >
                {deck.map((value, index) => (
                    <Card
                        key={index}
                        index={index}
                        value={value}
                        flipped={flipped.includes(index)}
                        matched={matched.has(index)}
                        onClick={handleFlip}
                    />
                ))}
            </div>

            <div className="flex justify-center mt-4">
                <button
                    className="bg-gray-600 px-3 py-1 rounded text-sm hover:bg-gray-500"
                    onClick={onBack}
                >
                    Back
                </button>
            </div>
        </div>
    );
}