import "./assets/styles/App.css";
import React, { useState, useEffect } from 'react';
import { Header, Footer, ControlPanel, GamePanel } from "./components/";
import { CARDS_LOGOS } from "./constants";
import shuffleArray from "./helpers/shuffle.js";

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("0");
  const [cards, setCards] = useState([]);

  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);

  // Function to create an array of card components
  /*const createCards = (rows, cols) => {
    const newCards = [];
    for (let i = 0; i < rows * cols; i++) {
      newCards.push(<card key={i} id={i + 1} />);
    }
    return newCards;
  };*/

  // useEffect to update the cards whenever rows or cols change
 /* useEffect(() => {
    setCards(createCards(rows, cols));
  }, [rows, cols]);*/

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
    switch (level) {
      case "0":
        //numOfCardPairs = 0;
        setRows(0);
        setCols(0);
        break;
      case "1":
        //numOfCardPairs = 2;
        setRows(9);
        setCols(9);
        break;
      case "2":
        //numOfCardPairs = 3;
        setRows(16);
        setCols(16);
        break;
      case "3":
        //numOfCardPairs = 6;
        setRows(16);
        setCols(30);
        break;
      default:
        setRows(9);
        setCols(9);
    }
    const field = [];
    shuffleArray(CARDS_LOGOS)
      .forEach((card) => {
        field.push({
          id: card,
          name: card,
        });
      });
    setCards(shuffleArray(field));
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
