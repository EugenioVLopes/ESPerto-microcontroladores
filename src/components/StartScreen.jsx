import { TextGenerateEffect } from "@/components/ui/TextGenerateEffect";
import { Vortex } from "@/components/ui/vortex";
import React, { useState } from "react";

export default function StartScreen({ onStart }) {
  const handleStart = () => {
    if (username.trim()) {
      onStart(username);
    }
  };
  return (
    <div className="w-[calc(100%-4rem)] mx-auto rounded-md  h-screen overflow-hidden">
      <Vortex
        backgroundColor="black"
        rangeY={800}
        particleCount={500}
        baseSpeed={0.01}
        className="flex items-center flex-col justify-center px-2 md:px-40  py-4 w-full h-full"
      >
        <h1 className="text-white text-4xl md:text-8xl font-bold text-center">
          <span className="text-red-400">ESP</span>erto
        </h1>
        <TextGenerateEffect
          words="Um jogo que testa sua memória."
          className="text-center text-[40px] md:text-4xl lg:text-5xl"
        />
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
          <button
            className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
            onClick={onStart}
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-16 py-2 text-2xl font-medium text-white backdrop-blur-3xl">
              Iniciar Jogo
            </span>
          </button>
          {/* <button className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-16 py-2 text-2xl font-medium text-white backdrop-blur-3xl">
              Ranking
            </span>
          </button> */}
        </div>
      </Vortex>
    </div>
  );
}
