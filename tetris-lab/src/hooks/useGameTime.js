import { useCallback, useRef, useState, useEffect } from "react";

export function useGameTime({ onTick: handleTick, speed }) {
  //   console.log("It's game time");

  const timeInterval = useRef(null);
  const [isRunning, setIsRunning] = useState(false);

  const startTime = useCallback(() => {
    if (timeInterval.current) {
      return console.warn("Timer already started");
    }
    console.log("starting time");
    timeInterval.current = setInterval(() => {
      handleTick();
    }, speed);
    setIsRunning(true);
  }, [handleTick, speed]);

  const stopTime = useCallback(() => {
    if (!timeInterval.current) {
      return console.warn("Nothing to stop");
    }
    console.log("stop time");

    clearInterval(timeInterval.current);
    timeInterval.current = null;
    setIsRunning(false);
  }, [timeInterval]);

  useEffect(() => {
    if (!timeInterval.current) return;
    stopTime();
    startTime();
  }, [startTime, stopTime, speed]);

  return { isRunning, startTime, stopTime };
}
