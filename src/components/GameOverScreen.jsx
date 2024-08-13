import React, { useEffect, useState } from "react";

export default function GameOverScreen({ score, onRestart }) {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    const highScores = JSON.parse(localStorage.getItem("highScores") || "[]");
    setRanking(highScores);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-white text-4xl font-bold mb-4">Game Over</h2>
      <p className="text-white text-2xl mb-6">Sua pontuação: {score}</p>
      <h3 className="text-white text-3xl font-bold mb-4">Ranking</h3>
      <ul className="text-white mb-6">
        {ranking.map((entry, index) => (
          <li key={index}>
            {entry.username}: {entry.score}
          </li>
        ))}
      </ul>
      <button
        onClick={onRestart}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition duration-200 rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset]"
      >
        Voltar para Tela Inicial
      </button>
    </div>
  );
}
