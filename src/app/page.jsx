"use client";
import { Vortex } from "@/components/ui/vortex";
import React, { useState, useEffect } from "react";
import StartScreen from "@/components/StartScreen";
import GameScreen from "@/components/GameScreen";
import GameOverScreen from "@/components/GameOverScreen";
import UserScreen from "@/components/UserScreen";

export default function Home() {
  const [gameState, setGameState] = useState("start");
  const [username, setUsername] = useState("");
  const [score, setScore] = useState(0);

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);

  const handleStart = () => {
    setGameState("user");
  };

  const handleUser = (name) => {
    setUsername(name);
    localStorage.setItem("username", name);
    setGameState("playing");
  };

  const handleGameOver = (finalScore) => {
    setScore(finalScore);
    setGameState("gameOver");
    const highScores = JSON.parse(localStorage.getItem("highScores") || "[]");
    highScores.push({ username, score: finalScore });
    highScores.sort((a, b) => b.score - a.score);
    localStorage.setItem("highScores", JSON.stringify(highScores.slice(0, 10)));
  };

  const handleRestart = () => {
    setGameState("start");
    setScore(0);
  };

  return (
    <div className="w-[calc(100%-4rem)] mx-auto rounded-md h-screen overflow-hidden">
      <Vortex
        backgroundColor="black"
        rangeY={800}
        particleCount={500}
        className="flex items-center flex-col justify-center px-2 md:px-40 py-4 w-full h-full"
      >
        {gameState === "start" && <StartScreen onStart={handleStart} />}
        {gameState === "user" && <UserScreen onUser={handleUser} />}
        {gameState === "playing" && <GameScreen onGameOver={handleGameOver} />}
        {gameState === "gameOver" && (
          <GameOverScreen score={score} onRestart={handleRestart} />
        )}
      </Vortex>
    </div>
  );
}
