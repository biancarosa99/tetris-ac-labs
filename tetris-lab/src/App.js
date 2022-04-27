import logo from "./logo.svg";
import "./App.css";
import Tetromino from "./Tetromino";
import { useGameTime } from "./hooks/useGameTime";
import { useState } from "react";
import { GameContainer } from "./components/GameContainer/GameContainer";
import { getEmptyBoard } from "./utils/utils";
import { TileBoard } from "./components/TileBoard/TileBoard";
import { RightPanel } from "./components/RightPanel/RightPanel";

function App() {
  const onTick = () => {
    console.log("tic tic");
  };

  const [speed, setSpeed] = useState(1000);
  const [board] = useState(getEmptyBoard());

  const { isRunning, startTime, stopTime } = useGameTime({ onTick, speed });

  console.log(speed);

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
