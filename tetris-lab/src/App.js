import logo from "./logo.svg";
import "./App.css";
import Tetromino from "./Tetromino";
import { useGameTime } from "./hooks/useGameTime";
import { useCallback, useState } from "react";
import { GameContainer } from "./components/GameContainer/GameContainer";
import { getEmptyBoard } from "./utils/utils";
import { TileBoard } from "./components/TileBoard/TileBoard";
import { RightPanel } from "./components/RightPanel/RightPanel";
import { randomTetromino } from "./tetrominos";
import { useBoard } from "./hooks/useBoard";

function App() {
  const [speed, setSpeed] = useState(1000);
  const [updateBoard, board] = useBoard();

  const onTick = useCallback(() => {
    console.log("tic tic");
    updateBoard();
  }, []);

  const { isRunning, startTime, stopTime } = useGameTime({ onTick, speed });

  return (
    <GameContainer>
      <TileBoard board={board} />
      <RightPanel>
        <button className="button" onClick={startTime} disabled={isRunning}>
          START
        </button>
        <button className="button" onClick={stopTime} disabled={!isRunning}>
          STOP
        </button>
        <button
          className="button"
          onClick={() => setSpeed((prev) => prev - 100)}
        >
          GO FASTER
        </button>
        <span>Time is {isRunning ? "running" : "not running"}</span>
      </RightPanel>
    </GameContainer>
  );
}

export default App;
