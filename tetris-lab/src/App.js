import logo from "./logo.svg";
import "./App.css";
import Tetromino from "./Tetromino";
import { useGameTime } from "./hooks/useGameTime";
import { useCallback, useState } from "react";
import { GameContainer } from "./components/GameContainer/GameContainer";
import { getEmptyBoard, DIRECTION } from "./utils/utils";
import { TileBoard } from "./components/TileBoard/TileBoard";
import { RightPanel } from "./components/RightPanel/RightPanel";
import { randomTetromino } from "./tetrominos";
import { useBoard } from "./hooks/useBoard";

function App() {
  const [speed, setSpeed] = useState(1000);
  const [updateBoard, board, updatePosition] = useBoard();

  const onTick = useCallback(() => {
    updateBoard();
  }, []);

  const { isRunning, startTime, stopTime } = useGameTime({ onTick, speed });

  const move = ({ keyCode }) => {
    console.log("moved....");
    stopTime();
    if (keyCode === 37) {
      updateBoard(DIRECTION.left);
    } else if (keyCode === 39) {
      updateBoard(DIRECTION.right);
    } else if (keyCode === 38) {
      updateBoard(DIRECTION.down, true);
    } else if (keyCode === 40) {
      setSpeed((prev) => setSpeed(prev - 100));
      console.log(speed);
    }
    startTime();
  };

  return (
    <GameContainer keyDown={move}>
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
        <span style={{ marginTop: "50px" }}>
          Time is {isRunning ? "running" : "not running"}
        </span>
      </RightPanel>
    </GameContainer>
  );
}

export default App;
