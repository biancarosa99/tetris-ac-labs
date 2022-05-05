import { useState, useEffect, useRef, useCallback } from "react";
import { randomTetromino } from "../tetrominos";
import { getEmptyBoard, DIRECTION } from "../utils/utils";

export const useBoard = () => {
  const [board, setBoard] = useState(getEmptyBoard());

  let keyPressed = false;

  const player = useRef({
    currentPos: { row: 0, column: 5 },
    tetromino: randomTetromino(),
  });

  const updatePosition = useCallback((direction = DIRECTION.down) => {
    let verticalAdjustment = 0;
    let horizontalAdjustment = 0;

    switch(direction) {
      case DIRECTION.up:
        verticalAdjustment = -1;
        break;
      case DIRECTION.down:
        verticalAdjustment = 1;
        break;
      case DIRECTION.left:
        horizontalAdjustment = -1;
        break;
      case DIRECTION.right:
        horizontalAdjustment = 1;
        break;
    }

    player.current = {
      currentPos: {
        row: player.current.currentPos.row + verticalAdjustment,
        column: player.current.currentPos.column + horizontalAdjustment,
      },
      tetromino: player.current.tetromino,
    };
  }, []);

  const updateBoard = (direction = DIRECTION.down) => {
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

    updatePosition(direction);
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
