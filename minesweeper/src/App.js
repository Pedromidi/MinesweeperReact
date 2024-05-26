import "./assets/styles/App.css";
import React, { useState } from "react";
import { Header, Footer, ControlPanel, GamePanel } from "./components/";
import { CARDS_LOGOS } from "./constants";
import shuffleArray from "./helpers/shuffle.js";

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("0");
  const [cards, setCards] = useState([]);

  const handleGameStart = () => {
    setGameStarted(!gameStarted);
    if (!gameStarted) createPanel(selectedLevel);
  };

  const handleLevelChange = (event) => {
    const { value } = event.currentTarget;
    setSelectedLevel(value);
    createPanel(value);
  };

  function createPanel(level) {
    let numOfCardPairs;
    switch (level) {
      case "0":
        numOfCardPairs = 0;
        break;
      default:
        numOfCardPairs = 3;
    }
    const doubledCardsObjects = [];
    shuffleArray(CARDS_LOGOS)
      .slice(0, numOfCardPairs)
      .forEach((card) => {
        doubledCardsObjects.push({
          id: card,
          name: card,
        });
        doubledCardsObjects.push({
          id: `${card}-clone`,
          name: card,
        });
      });
    setCards(shuffleArray(doubledCardsObjects));
  }

  return (
    <div id="container">
      <Header />
      <main>
        <ControlPanel
          gameStarted={gameStarted}
          onGameStart={handleGameStart}
          selectedLevel={selectedLevel}
          onLevelChange={handleLevelChange}
        />
        <GamePanel cards={cards} selectedLevel={selectedLevel} />
      </main>
      <Footer />
    </div>
  );
}
export default App;
