export const TETROMINOS = {
  I: {
    shape: [[true], [true], [true], [true]],
    color: "#0000cd",
  },

  J: {
    shape: [
      [false, true],
      [false, true],
      [false, true],
      [true, true],
    ],
    color: "orange",
  },

  L: {
    shape: [
      [true, false],
      [true, false],
      [true, false],
      [true, true],
    ],
    color: "#e00000",
  },

  O: {
    shape: [
      [true, true],
      [true, true],
    ],
    color: "#fc0fc0",
  },
  S: {
    shape: [
      [false, true, true],
      [true, true, false],
    ],
    color: "green",
  },
  Z: {
    shape: [
      [true, true, false],
      [false, true, true],
    ],
    color: "yellow",
  },
  T: {
    shape: [
      [true, true, true],
      [false, true, false],
    ],

    color: "#8601af",
  },
};

export const randomTetromino = () => {
  const tetrominoShapes = "IJLOSZT";

  const randTetromino =
    tetrominoShapes[Math.trunc(Math.random() * tetrominoShapes.length)];

  return TETROMINOS[randTetromino];
};
