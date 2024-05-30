/*import { useState, useEffect } from "react";

function Timer({ timeout, onTimer }) {
  const [seconds, setSeconds] = useState(timeout);
  const [idInterval, setIdInterval] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);
    setIdInterval(interval);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    onTimer(seconds);
    if (seconds === 0) clearInterval(idInterval);
  }, [seconds, onTimer, idInterval]);

  return <>{seconds}</>;
}

export default Timer;*/

import { useState, useEffect } from "react";

function Timer({ gameStarted, onTimer }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval;
    if (gameStarted) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else {
      setSeconds(0);
    }
    return () => clearInterval(interval);
  }, [gameStarted]);

  useEffect(() => {
    onTimer(seconds);
  }, [seconds, onTimer]);

  return <>{seconds}</>;
}

export default Timer;

