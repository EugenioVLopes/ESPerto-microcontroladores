"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useCallback } from "react";

/**
 * Lista de LEDs disponíveis no jogo.
 * @property {number} id - O ID do LED.
 * @property {string} name - O nome do LED.
 * @property {string} color - A cor do LED.
 */
const leds = [
  { id: 1, name: "LED1", color: "green" },
  { id: 2, name: "LED2", color: "red" },
  { id: 3, name: "LED3", color: "green" },
  { id: 4, name: "LED4", color: "blue" },
  { id: 5, name: "LED5", color: "green" },
  { id: 6, name: "LED6", color: "red" },
  { id: 7, name: "LED7", color: "green" },
];

/**
 * Classes de cores para os botões dos LEDs.
 * @property {string} green - A classe de cor para o LED verde.
 * @property {string} red - A classe de cor para o LED vermelho.
 * @property {string} blue - A classe de cor para o LED azul.
 */
const colorClasses = {
  green: "bg-green-500 hover:bg-green-600",
  red: "bg-red-500 hover:bg-red-600",
  blue: "bg-blue-500 hover:bg-blue-600",
};

let round = 0;

/**
 * Componente responsável por exibir a tela de jogo.
 *
 * @component
 * @param {Function} props.onGameOver - Função chamada quando o jogo termina.
 * @returns {JSX.Element} - Retorna a tela de jogo.
 */
export default function GameScreen({ onGameOver }) {
  const [sequence, setSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [isWaitingForSequence, setIsWaitingForSequence] = useState(true);
  const [score, setScore] = useState(0);
  const hasStartedRef = useRef(false);

  /**
   * Função assíncrona para buscar uma sequência.
   *
   * @returns {Promise<number[]>} A sequência de números gerada.
   * @throws {Error} Caso ocorra algum erro na busca da sequência.
   */
  const fetchSequence = useCallback(
    async (numeroPiscadas) => {
      setIsWaitingForSequence(true);
      try {
        const response = await axios.post(
          "http://127.0.0.1:3000/api/sequencia/gerar",
          {
            numero_piscadas: numeroPiscadas,
          }
        );
        if (response.data.codigo === "1") {
          setIsWaitingForSequence(false);
          return response.data.sequencia.map(Number);
        } else {
          throw new Error(response.data.mensagem);
        }
      } catch (error) {
        console.error("Erro ao buscar sequência:", error);
        setIsWaitingForSequence(false);
        return Array(score + 3)
          .fill()
          .map(() => Math.floor(Math.random() * 7) + 1);
      }
    },
    [score]
  );

  console.log("Sequência:", sequence);

  /**
   * Inicia uma nova rodada do jogo.
   *
   * @returns {Promise<void>} Uma Promise que é resolvida quando a nova rodada é iniciada.
   */
  const startNewRound = useCallback(async () => {
    round += 1;
    const numeroPiscadas = 3 + (round - 1);
    const newSequence = await fetchSequence(numeroPiscadas);
    setSequence(newSequence);
    await new Promise((resolve) =>
      setTimeout(resolve, newSequence.length * 1000)
    ); // Tempo estimado da sequência
  }, [fetchSequence]); // Adicione as dependências relevantes

  useEffect(() => {
    if (!hasStartedRef.current) {
      hasStartedRef.current = true;
      startNewRound();
    }
  }, [startNewRound]);

  /**
   * Acende e apaga um LED em sequência.
   * @param {number} ledId - O ID do LED a ser controlado.
   * @param {number} duration - A duração em milissegundos que o LED ficará aceso.
   * @returns {Promise<void>} - Uma Promise que é resolvida quando a sequência é concluída.
   * @throws {Error} - Se ocorrer um erro ao controlar o LED.
   */
  const blinkLed = async (ledId, duration = 1000) => {
    try {
      // Acende o LED
      await axios.post("http://127.0.0.1:3000/api/sequencia/acender", {
        led_id: ledId,
      });
      console.log(`LED ${ledId} aceso`);

      // Espera pela duração especificada
      await new Promise((resolve) => setTimeout(resolve, duration));

      //   // Apaga o LED
      //   await axios.post("http://127.0.0.1:3000/api/sequencia/desligar", {
      //     led_id: ledId,
      //   });
      //   console.log(`LED ${ledId} apagado`);
    } catch (error) {
      console.error(`Erro ao controlar LED ${ledId}:`, error);
      onGameOver();
      throw error; // Re-lança o erro para ser tratado pelo chamador, se necessário
    }
  };

  /**
   * Manipula o clique de um botão do LED.
   *
   * @param {number} ledId - O ID do LED clicado.
   * @returns {Promise<void>} - Uma Promise vazia.
   */
  const handleButtonClick = async (ledId) => {
    if (isWaitingForSequence) return;

    const newUserSequence = [...userSequence, ledId];
    setUserSequence(newUserSequence);

    await blinkLed(ledId);

    if (
      newUserSequence[newUserSequence.length - 1] !==
      sequence[newUserSequence.length - 1]
    ) {
      console.log("Sequência incorreta. Fim de jogo.");
      onGameOver(score, sequence);
    } else if (newUserSequence.length === sequence.length) {
      console.log("Sequência correta! Próxima rodada.");
      setScore(score + 1);
      setUserSequence([]);
      startNewRound();
    }
  };

  if (isWaitingForSequence) {
    return <div className="text-white text-2xl">Recebendo Sequência...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center p-4  min-h-screen">
      <h1 className="text-white text-4xl font-bold mb-4">Fase: {round}</h1>
      <h2 className="text-white text-4xl font-bold mb-6">Pontuação: {score}</h2>
      <div className="text-white text-2xl mb-4">
        Sua vez! Repita a sequência.
      </div>
      <div className="grid grid-cols-2 md:grid-cols-7 gap-4 mt-4">
        {leds.map((led) => (
          <button
            key={led.id}
            onClick={() => handleButtonClick(led.id)}
            disabled={isWaitingForSequence}
            className={`
              w-24 h-24 rounded-full 
              ${colorClasses[led.color]}
              transition-all duration-300 ease-in-out
              transform hover:scale-105
              focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            <span className="text-white font-bold">{led.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
