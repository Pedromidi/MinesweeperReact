import { useState, useEffect } from "react";

function Timer({ gameStarted, onTimer, gameOver }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval;
    if (gameStarted && !gameOver) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else {
      clearInterval(interval);  // Clear the interval when game is not started or is over
    }
    return () => clearInterval(interval);
  }, [gameStarted, gameOver]); // Add gameOver to the dependency array

  useEffect(() => {
    if (!gameOver) {
      onTimer(seconds);
    }
  }, [seconds, onTimer, gameOver]); // Add gameOver to the dependency array

  return <>{seconds}</>;
}

export default Timer;
