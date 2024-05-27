import "./assets/styles/App.css";
import React, { useState } from "react";
import { Header, Footer, ControlPanel, GamePanel } from "./components/";
import { CARDS_LOGOS } from "./constants";
import shuffleArray from "./helpers/shuffle.js";

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState("0");
  const [cards, setCards] = useState([]);

  const levels = {
    "0": { rows: 0, cols: 0, mines: 0 },
    "1": { rows: 9, cols: 9, mines: 10 },
    "2": { rows: 16, cols: 16, mines: 40 },
    "3": { rows: 16, cols: 30, mines: 99 },
  };

  const handleGameStart = () => {
    setGameStarted(!gameStarted);
    if (!gameStarted) createPanel(selectedLevel);
  };

  const handleLevelChange = (event) => {
    const { value } = event.currentTarget;
    setSelectedLevel(value);
    createPanel(value);
  };

  const initializeBoard = (level) => {
    const { rows, cols, mines } = levels[level];
    const newBoard = createBoard(rows, cols, mines);
    const newCards = generateCards(newBoard);
    setBoard(newBoard);
    setCards(newCards);
  };

  const createBoard = (rows, cols, mines) => {
    const board = Array(rows)
      .fill(null)
      .map(() => Array(cols).fill({ mine: false, adjacentMines: 0 }));

    let placedMines = 0;

    while (placedMines < mines) {
      const row = Math.floor(Math.random() * rows);
      const col = Math.floor(Math.random() * cols);

      if (!board[row][col].mine) {
        board[row][col].mine = true;
        placedMines++;
        updateAdjacentCells(board, row, col);
      }
    }
    return board;
  };

  const updateAdjacentCells = (board, row, col) => {
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1], /*X*/ [0, 1],
      [1, -1], [1, 0], [1, 1],
    ];

    directions.forEach(([dr, dc]) => {
      const nr = row + dr;
      const nc = col + dc;
      if (nr >= 0 && nr < board.length && nc >= 0 && nc < board[0].length && !board[nr][nc].mine) {
        board[nr][nc].adjacentMines += 1;
      }
    });
  };

  const generateCards = (board) => {
    const cards = [];
    board.forEach((row, rIndex) => {
      row.forEach((cell, cIndex) => {
        cards.push({
          id: `${rIndex}-${cIndex}`,
          name: cell.mine ? "mine" : cell.adjacentMines.toString(),
          row: rIndex,
          col: cIndex,
        });
      });
    });
    return cards;
  };
  /*
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
  */
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
