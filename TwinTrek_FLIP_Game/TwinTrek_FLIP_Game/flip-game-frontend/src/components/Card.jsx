import React from "react";
import { motion } from "framer-motion";
import defaultImg from "../assets/default.jpg";
import { imageMap } from "../data/deck.js";

export default function Card({ index, value, flipped, matched, mismatched, onClick }) {
    const handleClick = () => {
        if (!matched && !flipped) {
            onClick(index, value);
        }
    };

    // Debugging log
    console.log("Card value:", value, "Image src:", imageMap[value]);

    return (
        <div
            className={`card-container perspective ${mismatched ? 'card-shake' : ''}`}
            onClick={handleClick}
            role="button"
            aria-label={`Card ${index}`}
        >
            <motion.div
                className={`card-inner ${(flipped || matched) ? "flipped" : ""}`}
                animate={{ rotateY: (flipped || matched) ? 180 : 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                {/* Front face (Unflipped state) */}
                <div className="card-face card-front flex items-center justify-center border border-purple-500/40 hover:border-pink-400 transition-colors shadow-inner rounded-xl bg-gradient-to-br from-purple-900/80 to-pink-900/80 overflow-hidden relative backdrop-blur-md">
                    <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')]"></div>
                    <span className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-pink-300 to-purple-400 drop-shadow-[0_0_15px_rgba(236,72,153,0.8)] z-10">✨</span>
                </div>

                {/* Back face */}
                <div className={`card-face card-back bg-black/60 backdrop-blur-sm rounded-xl overflow-hidden ${matched ? "ring-4 ring-pink-500 shadow-[0_0_30px_rgba(236,72,153,0.8)] card-pulse" : "border border-purple-500/40"}`}>
                    <img
                        src={imageMap[value]}
                        alt={`Card ${value}`}
                        className="w-full h-full object-contain drop-shadow-lg"
                    />
                </div>
            </motion.div>
        </div>
    );
}
