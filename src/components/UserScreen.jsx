import React, { useState } from "react";

export default function UserScreen({ onUser }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      onUser(name);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-white text-4xl font-bold mb-6">Digite seu nome</h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-4 py-2 mb-4 text-black rounded"
          placeholder="Seu nome"
        />
        <button
          type="submit"
          className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-16 py-2 text-2xl font-medium text-white backdrop-blur-3xl">
            Começar
          </span>
        </button>
      </form>
    </div>
  );
}
