import { useState, useEffect, useRef, useCallback } from "react";
import { randomTetromino } from "../tetrominos";
import { getEmptyBoard } from "../utils/utils";

const DIRECTION = {
  up: "up",
  down: "down",
};

const moveDirection = {
  left: "left",
  right: "right",
};

export const useBoard = () => {
  const [board, setBoard] = useState(getEmptyBoard());

  let keyPressed = false;

  const player = useRef({
    currentPos: { row: 0, column: 5 },
    tetromino: randomTetromino(),
  });

  useEffect(() => {
    //updateBoard(board);
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", (event) => {
      moveTetrominoLeftOrRight(moveDirection.right);
    });

    return () => {
      window.removeEventListener("keydown", (event) => {
        moveTetrominoLeftOrRight(moveDirection.right);
      });
    };
  });

  const updatePosition = useCallback((direction = DIRECTION.down) => {
    let verticalAdjustment = 0;
    if (direction === DIRECTION.down) {
      verticalAdjustment = 1;
    } else if (direction === DIRECTION.up) {
      verticalAdjustment = -1;
    }
    player.current = {
      currentPos: {
        row: player.current.currentPos.row + verticalAdjustment,
        column: player.current.currentPos.column,
      },
      tetromino: player.current.tetromino,
    };
  }, []);

  const moveTetrominoLeftOrRight = useCallback((direction = "left") => {
    let moveCol = -1;
    if (direction === moveDirection.right) {
      moveCol = 1;
    }

    player.current = {
      currentPos: {
        row: player.current.currentPos.row,
        column: player.current.currentPos.column + moveCol,
      },
      tetromino: player.current.tetromino,
    };
    console.log(
      player.current.currentPos.row,
      player.current.currentPos.column,
      moveCol
    );
  }, []);

  const updateBoard = () => {
    //Step 1: sterge pozitia veche
    player.current.tetromino.shape.forEach((row, rowIdx) => {
      row.forEach((val, colIdx) => {
        const row = player.current.currentPos.row + rowIdx;
        const column = player.current.currentPos.column + colIdx;
        if (val === true) {
          board[row][column] = null;
        }
      });
    });

    //Step 2: muta piesa

    updatePosition(DIRECTION.down);
    // moveTetrominoLeftOrRight(moveDirection.right);

    //Step 3: check for collisions

    let isCollided = false;
    player.current.tetromino.shape.forEach((row, rowIdx) => {
      row.forEach((val, colIdx) => {
        if (val === true) {
          const row = player.current.currentPos.row + rowIdx;
          const column = player.current.currentPos.column + colIdx;
          if (
            row > 19 ||
            row < 0 ||
            column < 0 ||
            column > 11 ||
            board[row][column] != null
          ) {
            isCollided = true;
          }
        }
      });
    });

    //Step 4: daca exista coliziune, muta piesa inapoi and clg
    if (isCollided) {
      console.log("Coliziune happened");
      updatePosition(DIRECTION.up);
    }

    //Step 5: draw the tetromino
    if (keyPressed === false) {
      player.current.tetromino.shape.forEach((row, rowIdx) => {
        row.forEach((val, colIdx) => {
          const row = player.current.currentPos.row + rowIdx;
          const column = player.current.currentPos.column + colIdx;

          if (val === true) {
            board[row][column] = player.current.tetromino.color;
          }
        });
      });
    } else {
      keyPressed = false;
    }

    if (isCollided) {
      player.current = {
        currentPos: { row: 0, column: 5 },
        tetromino: randomTetromino(),
      };
      keyPressed = false;
    }
    setBoard([...board]);
  };

  return [updateBoard, board];
};
