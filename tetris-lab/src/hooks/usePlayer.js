import { useState, useEffect, useRef } from "react";
import { randomTetromino } from "../tetrominos";
import { getEmptyBoard } from "../utils/utils";

export const usePlayer = () => {
  const [board, setBoard] = useState(getEmptyBoard());

  const player = useRef({
    currentPos: { row: 0, column: 5 },
    tetromino: randomTetromino(),
  });

  useEffect(() => {
    updateBoard(board);
  }, []);

  const updatePosition = () => {
    player.current = {
      currentPos: {
        row: player.current.currentPos.row + 1,
        column: player.current.currentPos.column,
      },
      tetromino: player.current.tetromino,
    };
    updateBoard(board);
  };

  const updateBoard = () => {
    player.current.tetromino.shape.forEach((row, rowIdx) => {
      row.forEach((val, colIdx) => {
        const row = player.current.currentPos.row + rowIdx;
        const column = player.current.currentPos.column + colIdx;

        if (row > 0) {
          board[row - 1][column] = null;
        }
      });
    });

    player.current.tetromino.shape.forEach((row, rowIdx) => {
      row.forEach((val, colIdx) => {
        const row = player.current.currentPos.row + rowIdx;
        const column = player.current.currentPos.column + colIdx;

        if (val === true) {
          board[row][column] = player.current.tetromino.color;
        }
      });
    });
    setBoard([...board]);
  };

  return [player.current, updatePosition, board];
};
