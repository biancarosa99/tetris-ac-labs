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
import useDarkMode from "./hooks/useDarkMode";
import Navbar from "./components/Navbar";

function App() {
  const [speed, setSpeed] = useState(1000);
  const [updateBoard, board, drawPlayer, score] = useBoard();

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
      // setSpeed((prev) => setSpeed(prev - 100));
      //console.log(speed);
      updateBoard();
    }
    startTime();
  };

  function onStartHandler() {
    drawPlayer();
    startTime();
  }

  return (
    <div className="bg-rose-50 dark:bg-black">
      <Navbar />
      <GameContainer
        // className="bg-slate-900 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl"
        keyDown={move}
      >
        <TileBoard board={board} />
        <RightPanel>
          <button
            className="button from-pink-500 dark:to-blue-500"
            onClick={onStartHandler}
            disabled={isRunning}
          >
            START
          </button>
          <button
            className="button from-pink-500 dark:to-blue-500"
            onClick={stopTime}
            disabled={!isRunning}
          >
            STOP
          </button>
          <button
            className="button from-pink-500 dark:to-blue-500"
            onClick={() => setSpeed((prev) => prev - 100)}
          >
            GO FASTER
          </button>
          <span
            className="text-yellow-500 dark:text-blue-500 "
            style={{ marginTop: "50px" }}
          >
            Time is {isRunning ? "running" : "not running"}
          </span>

          <span
            className="text-yellow-500 dark:text-blue-500 "
            style={{ marginTop: "50px" }}
          >
            Score: {score}
          </span>
        </RightPanel>
      </GameContainer>
    </div>
  );
}

export default App;
