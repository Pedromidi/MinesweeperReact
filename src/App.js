import "./assets/styles/App.css";
import React, { useState, useEffect } from 'react';
import { Header, Footer, ControlPanel, GamePanel } from "./components/";

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("0");
  const [cards, setCards] = useState([]);
  const [grid, setGrid] = useState([]);

  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [numMines, setNumMines] = useState(3);
  const [gameOver, setGameOver] = useState(false);

  const [correctlyFlaggedMines, setCorrectlyFlaggedMines] = useState(0);

  useEffect(() => {
    if (gameStarted) {
      createPanel(selectedLevel);
    }
  }, [gameStarted, selectedLevel]);

  const handleGameStart = () => {
    setGameStarted(!gameStarted);
    if (!gameStarted) {
      setGameOver(false); // Reset game over state when starting a new game
      setCorrectlyFlaggedMines(0);
    }
  };

  const handleLevelChange = (event) => {
    const { value } = event.currentTarget;
    setSelectedLevel(value);
  };

  const handleCardClick = (id) => {
    if (gameOver) return; // Do nothing if the game is over

    const [row, col] = id.split('-').map(Number);
    const card = cards.find(card => card.id === id);
    if (card.state !== 'placeholder') return;

    if (grid[row][col] === 'mine') {
      setGameOver(true); // Set game over state if a mine is clicked
      setCards(prevCards =>
        prevCards.map(card =>
          grid[row][col] === 'mine' ? { ...card, state: 'flipped' } : card
        )
      );
    } else if (grid[row][col] === 0) {
      floodFill(row, col);
    } else {
      setCards(prevCards =>
        prevCards.map(card =>
          card.id === id ? { ...card, state: 'flipped' } : card
        )
      );
    }
  };

  const handleRightClick = (id) => {
    if (gameOver) return; // Do nothing if the game is over
    setCards(prevCards =>
      prevCards.map(card => {
        if (card.id === id) {
          let newState;
          if (card.state === 'placeholder') {
            newState = 'flag';
            if (grid[card.id.split('-')[0]][card.id.split('-')[1]] === 'mine') {
              setCorrectlyFlaggedMines(prev => prev + 1);
            }
          } else if (card.state === 'flag') {
            newState = 'qm';
            if (grid[card.id.split('-')[0]][card.id.split('-')[1]] === 'mine') {
              setCorrectlyFlaggedMines(prev => prev - 1);
            }
          } else if (card.state === 'qm') {
            newState = 'placeholder';
          } else {
            newState = card.state;
          }
          return { ...card, state: newState };
        }
        return card;
      })
    );
  };

  useEffect(() => {
    checkGameOver();
  }, [cards, correctlyFlaggedMines]);

  const checkGameOver = () => {
    if(gameOver) return;
    const allFlipped = cards.every(card => card.state === 'flipped' || card.name === 'mine');
    if (allFlipped && correctlyFlaggedMines === numMines) {
      setGameOver(true);
    } else {
      setGameOver(false);
    }
  };

  const floodFill = (row, col) => {
    const queue = [[row, col]];
    const visited = new Set();
    const toReveal = new Set();
    const directions = [
      [1, 0], [-1, 0], [0, 1], [0, -1],
      [1, 1], [1, -1], [-1, 1], [-1, -1]
    ];

    while (queue.length) {
      const [r, c] = queue.shift();
      const id = `${r}-${c}`;
      if (visited.has(id)) continue;
      visited.add(id);
      toReveal.add(id);

      if (grid[r][c] === 0) {
        directions.forEach(([dr, dc]) => {
          const nr = r + dr;
          const nc = c + dc;
          if (
            nr >= 0 && nr < rows &&
            nc >= 0 && nc < cols &&
            !visited.has(`${nr}-${nc}`)
          ) {
            queue.push([nr, nc]);
          }
        });
      }
    }

    setCards(prevCards =>
      prevCards.map(card =>
        toReveal.has(card.id) ? { ...card, state: 'flipped' } : card
      )
    );
  };

  function createPanel(level) {
    let newRows, newCols, newNumMines;
    switch (level) {
      case "0":
        newRows = 0;
        newCols = 0;
        newNumMines = 0;
        break;
      case "1":
        newRows = 9;
        newCols = 9;
        newNumMines = 10;
        break;
      case "2":
        newRows = 16;
        newCols = 16;
        newNumMines = 40;
        break;
      case "3":
        newRows = 16;
        newCols = 30;
        newNumMines = 99;
        break;
      default:
        newRows = 9;
        newCols = 9;
        newNumMines = 10;
    }

    setRows(newRows);
    setCols(newCols);
    setNumMines(newNumMines);

    // Create an empty grid
    const newGrid = Array(newRows).fill().map(() => Array(newCols).fill(0));

    // Randomly place mines on the grid
    let minesPlaced = 0;
    while (minesPlaced < newNumMines) {
      const row = Math.floor(Math.random() * newRows);
      const col = Math.floor(Math.random() * newCols);
      if (newGrid[row][col] !== 'mine') {
        newGrid[row][col] = 'mine';
        minesPlaced++;

        // Update adjacent tiles' values
        for (let i = Math.max(0, row - 1); i <= Math.min(row + 1, newRows - 1); i++) {
          for (let j = Math.max(0, col - 1); j <= Math.min(col + 1, newCols - 1); j++) {
            if (newGrid[i][j] !== 'mine') {
              newGrid[i][j]++;
            }
          }
        }
      }
    }

    setGrid(newGrid);

    // Convert grid values to card names
    const field = [];
    for (let i = 0; i < newRows; i++) {
      for (let j = 0; j < newCols; j++) {
        field.push({ 
          id: `${i}-${j}`, 
          name: newGrid[i][j] === 'mine' ? 'mine' : `${newGrid[i][j]}`,
          state: "placeholder"
        });
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
          gameOver={gameOver}
          correctlyFlaggedMines={correctlyFlaggedMines}
        />
        <GamePanel 
          cards={cards} 
          selectedLevel={selectedLevel} 
          onCardClick={handleCardClick}
          onRightClick={handleRightClick}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;