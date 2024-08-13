import React, { useState, useEffect } from "react";

const colors = ["red", "blue", "green", "yellow"];

export default function GameScreen({ onGameOver }) {
  const [sequence, setSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [isShowingSequence, setIsShowingSequence] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    startNewRound();
  }, []);

  const fetchSequence = () => {
    // Simulating a fetch from backend
    return new Promise((resolve) => {
      setTimeout(() => {
        const newColor = colors[Math.floor(Math.random() * colors.length)];
        resolve([...sequence, newColor]);
      }, 1000);
    });
  };

  const startNewRound = async () => {
    setIsShowingSequence(true);
    const newSequence = await fetchSequence();
    setSequence(newSequence);
    showSequence(newSequence);
  };

  const showSequence = (seq) => {
    seq.forEach((color, index) => {
      setTimeout(() => {
        // Here you would add logic to highlight the button
        if (index === seq.length - 1) {
          setIsShowingSequence(false);
        }
      }, (index + 1) * 1000);
    });
  };

  const handleButtonClick = (color) => {
    if (isShowingSequence) return;

    const newUserSequence = [...userSequence, color];
    setUserSequence(newUserSequence);

    if (
      newUserSequence[newUserSequence.length - 1] !==
      sequence[newUserSequence.length - 1]
    ) {
      onGameOver(score);
    } else if (newUserSequence.length === sequence.length) {
      setScore(score + 1);
      setUserSequence([]);
      startNewRound();
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-white text-4xl font-bold mb-6">Score: {score}</h2>
      <div className="grid grid-cols-2 gap-4">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => handleButtonClick(color)}
            className={`w-24 h-24 rounded-full ${
              color === "red"
                ? "bg-red-500"
                : color === "blue"
                ? "bg-blue-500"
                : color === "green"
                ? "bg-green-500"
                : "bg-yellow-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
