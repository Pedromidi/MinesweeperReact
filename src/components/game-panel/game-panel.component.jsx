import React from "react";
import "./game-panel.css";
import { Card } from "../index";

function GamePanel({ cards }) {
  return (
    <section className="game-panel">
      <h3 className="sr-only">Peças do Jogo</h3>
      <div id="game">
        {cards.map((elemento) => (
          <Card key={elemento.id} name={elemento.name} />
        ))}
      </div>
    </section>
  );
}

export default GamePanel;
