import React from "react";
import { motion } from "framer-motion";
import defaultImg from "../assets/default.jpg";
import { imageMap } from "../data/deck.js";

export default function Card({ index, value, flipped, matched, onClick }) {
    const handleClick = () => {
        if (!matched && !flipped) {
            onClick(index, value);
        }
    };

    // Debugging log
    console.log("Card value:", value, "Image src:", imageMap[value]);

    return (
        <div
            className="card-container perspective"
            onClick={handleClick}
            role="button"
            aria-label={`Card ${index}`}
        >
            <motion.div
                className={`card-inner ${flipped ? "flipped" : ""} ${matched ? "ring-4 ring-green-500" : ""}`}
                animate={{ rotateY: flipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                {/* Front face */}
                <div className="card-face card-front">
                    <img
                        src={defaultImg}
                        alt="Default"
                        className="w-full h-full object-contain"
                    />
                </div>

                {/* Back face */}
                <div className="card-face card-back">
                    <img
                        src={imageMap[value]}
                        alt={`Card ${value}`}
                        className="w-full h-full object-contain"
                    />
                </div>
            </motion.div>
        </div>
    );
}
