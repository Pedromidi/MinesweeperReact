import "./assets/styles/App.css";
import React, { useState } from 'react';
import { Header, Footer, ControlPanel, GamePanel } from "./components/";
import checkIfIsFlipped from "./helpers/checkIfIsFlipped";

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("0");
  const [cards, setCards] = useState([]);

  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [numMines, setNumMines] = useState(3);

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
        setNumMines(0);
        break;
      case "1":
        //numOfCardPairs = 2;
        setRows(9);
        setCols(9);
        setNumMines(10);
        break;
      case "2":
        //numOfCardPairs = 3;
        setRows(16);
        setCols(16);
        setNumMines(40);
        break;
      case "3":
        //numOfCardPairs = 6;
        setRows(16);
        setCols(30);
        setNumMines(99);
        break;
      default:
        setRows(9);
        setCols(9);
        setNumMines(10);
    }

    // Create an empty grid
    const grid = Array(rows).fill().map(() => Array(cols).fill(0));

    // Randomly place mines on the grid
    let minesPlaced = 0;
    while (minesPlaced < numMines) {
      const row = Math.floor(Math.random() * rows);
      const col = Math.floor(Math.random() * cols);
      if (grid[row][col] !== 'mine') {
        grid[row][col] = 'mine';
        minesPlaced++;

        // Update adjacent tiles' values
        for (let i = Math.max(0, row - 1); i <= Math.min(row + 1, rows - 1); i++) {
          for (let j = Math.max(0, col - 1); j <= Math.min(col + 1, cols - 1); j++) {
            if (grid[i][j] !== 'mine') {
              grid[i][j]++;
            }
          }
        }
      }
    }

    // Convert grid values to card names
    const field = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        field.push({ id: `${i}-${j}`, name: grid[i][j] === 'mine' ? 'mine' : `${grid[i][j]}` });
      }
    }
    setCards(field);
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
        <GamePanel 
          cards={cards} 
          selectedLevel={selectedLevel} />
      </main>
      <Footer />
    </div>
  );
}
export default App;
