import React from "react";
import "./game-panel.css";
import { Card } from "../index";

function GamePanel({ cards, selectedLevel, onCardClick, onRightClick, gameOver }) {
  const gameClass =
    selectedLevel === "1"
      ? ""
      : selectedLevel === "2"
      ? "intermedio"
      : selectedLevel === "3"
      ? "avancado"
      : "";

  return (
    <section className="game-panel">
      <h3 className="sr-only">Peças do Jogo</h3>
      <div id="game" className={gameClass}>
        {cards.map((elemento) => (
          <Card 
            key={elemento.id} 
            name={elemento.name} 
            id={elemento.id}
            state={elemento.state}
            onCardClick={gameOver ? null : onCardClick}
            onRightClick={gameOver ? null : onRightClick}
          />
        ))}
      </div>
    </section>
  );
}

export default GamePanel;