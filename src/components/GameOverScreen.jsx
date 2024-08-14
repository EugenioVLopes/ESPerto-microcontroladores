import React, { useEffect, useState } from "react";

export default function GameOverScreen({ score, onRestart, correctSequence }) {
  const [ranking, setRanking] = useState([]);
  const [playerName, setPlayerName] = useState("");

  useEffect(() => {
    loadRanking();
  }, []);

  const loadRanking = () => {
    const highScores = JSON.parse(localStorage.getItem("highScores") || "[]");
    setRanking(highScores.sort((a, b) => b.score - a.score).slice(0, 5)); // Top 5 scores
  };

  const saveScore = () => {
    if (playerName.trim()) {
      const newHighScores = [...ranking, { username: playerName, score }];
      newHighScores.sort((a, b) => b.score - a.score);
      localStorage.setItem(
        "highScores",
        JSON.stringify(newHighScores.slice(0, 5))
      );
      loadRanking();
      setPlayerName("");
    }
  };

  const resetRanking = () => {
    localStorage.removeItem("highScores");
    setRanking([]);
  };

  return (
    <div className="flex flex-col items-center bg-slate-900 p-8 rounded-lg shadow-lg">
      <h2 className="text-white text-4xl font-bold mb-4">Game Over</h2>
      <p className="text-white text-2xl mb-6">Sua pontuação: {score}</p>
      <h3 className="text-white text-2xl font-bold mb-4">
        Sequência Correta:{" "}
        {correctSequence && correctSequence?.map(String).join("-")}
      </h3>
      {/* <p className="text-white text-xl mb-6"></p> */}

      <h3 className="text-white text-3xl font-bold mb-4">Top 5 Ranking</h3>
      {ranking.length > 0 ? (
        <ul className="text-white mb-6 w-full max-w-md">
          {ranking.map((entry, index) => (
            <li
              key={index}
              className="flex justify-between items-center mb-2 bg-slate-700 p-2 rounded"
            >
              <span>
                {index + 1}. {entry.username}
              </span>
              <span className="font-bold">{entry.score}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-white mb-6">Nenhuma pontuação registrada ainda.</p>
      )}

      <div className="flex space-x-4">
        <button
          onClick={onRestart}
          className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-8 py-1 text-sm font-medium text-white backdrop-blur-3xl">
            Jogar Novamente
          </span>
        </button>

        <button
          onClick={resetRanking}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Resetar Ranking
        </button>
      </div>
    </div>
  );
}
