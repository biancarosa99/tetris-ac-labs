import { useState, useEffect, useRef, useCallback } from "react";
import { randomTetromino } from "../tetrominos";
import { getEmptyBoard, DIRECTION, getOppositeDirection } from "../utils/utils";

export const useBoard = () => {
  const [board, setBoard] = useState(getEmptyBoard());
  const [score, setScore] = useState(0);

  let keyPressed = false;

  const player = useRef({
    currentPos: { row: 0, column: 5 },
    tetromino: randomTetromino(),
  });

  let oldTetro = player.current.tetromino.shape;

  const rotateTetromino = () => {
    oldTetro = player.current.tetromino.shape;
    let newTetro = player.current.tetromino.shape[0].map((_, colIndex) =>
      player.current.tetromino.shape.map((row) => row[colIndex])
    );

    player.current.tetromino.shape = newTetro;
  };

  const updatePosition = useCallback(
    (direction = DIRECTION.down, rotate = false) => {
      let verticalAdjustment = 0;
      let horizontalAdjustment = 0;

      switch (direction) {
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

      if (rotate) {
        rotateTetromino();
      }
      console.log(`update position ${rotate}`);

      player.current = {
        currentPos: {
          row: player.current.currentPos.row + verticalAdjustment,
          column: player.current.currentPos.column + horizontalAdjustment,
        },
        tetromino: player.current.tetromino,
      };
    },
    []
  );

  const updateBoard = (direction = DIRECTION.down, rotate = false) => {
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

    updatePosition(direction, rotate);
    console.log(`update board ${rotate}`);
    // moveTetrominoLeftOrRight(moveDirection.right);

    //Step 3: check for collisions

    let isCollided = false;
    let outOfBownds = false;
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
          if (row < 0) {
            outOfBownds = true;
          }
        }
      });
    });

    //Step 4: daca exista coliziune, muta piesa inapoi and clg
    if (isCollided && rotate) {
      player.current.tetromino.shape = oldTetro;
      updatePosition(getOppositeDirection(direction));
    } else if (isCollided) {
      console.log("Coliziune happened");
      updatePosition(getOppositeDirection(direction));
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
    if (isCollided && direction === DIRECTION.down && rotate && outOfBownds) {
      player.current = {
        currentPos: { row: 0, column: 5 },
        tetromino: randomTetromino(),
      };
      keyPressed = false;
    } else if (isCollided && direction === DIRECTION.down && !rotate) {
      let linesToErase = [];
      for (let i = 0; i < 20; i++) {
        let isLineComplete = true;
        for (let j = 0; j < 12; j++) {
          if (board[i][j] === null) {
            isLineComplete = false;
          }
        }
        if (isLineComplete) {
          linesToErase.push(i);
          setScore((prev) => prev + 1);
        }
      }

      eraseLines(linesToErase, board);
      player.current = {
        currentPos: { row: 0, column: 5 },
        tetromino: randomTetromino(),
      };

      player.current.tetromino.shape.forEach((row, rowIdx) => {
        row.forEach((val, colIdx) => {
          const row = player.current.currentPos.row + rowIdx;
          const column = player.current.currentPos.column + colIdx;

          if (val === true) {
            board[row][column] = player.current.tetromino.color;
          }
        });
      });

      keyPressed = false;
    }

    setBoard([...board]);
  };

  function eraseLines(linesToErase, board) {
    for (let i = 0; i < linesToErase.length; i++) {
      let lineIndex = linesToErase[i];
      for (let m = lineIndex; m > 0; m--) {
        for (let n = 0; n < 12; n++) {
          board[m][n] = board[m - 1][n];
        }
      }
    }
  }

  function drawPlayer() {
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
  }

  return [updateBoard, board, drawPlayer, score];
};
