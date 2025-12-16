// src/data/deck.js
import rabbit from "../assets/rabbit.png";
import cat from "../assets/cat.png";
import lion from "../assets/lion.png";
import elephant from "../assets/elephant.png";
import cow from "../assets/cow.png";
import monkey from "../assets/monkey.png";
import octopus from "../assets/octopus.png";
import panda from "../assets/panda.png";
import penguin from "../assets/penguin.png";

// Build deck with pairs (keys only)
const deck = [
    "rabbit", "cat", "lion", "elephant", "cow",
    "monkey", "octopus", "panda", "penguin",
    "rabbit", "cat", "lion", "elephant", "cow",
    "monkey", "octopus", "panda", "penguin",
];

export const getShuffledDeck = () => {
    return deck
        .map((card) => ({ card, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ card }) => card);
};

// Map string keys to image imports
export const imageMap = {
    rabbit,
    cat,
    lion,
    elephant,
    cow,
    monkey,
    octopus,
    panda,
    penguin,
};
