export const TETROMINOS = {
  I: {
    shape: [[true], [true], [true], [true]],
    color: "blue",
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
    color: "red",
  },

  O: {
    shape: [
      [true, true],
      [true, true],
    ],
    color: "pink",
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

    color: "purple",
  },
};

export const randomTetromino = () => {
  const tetrominoShapes = "IJLOSZT";

  const randTetromino =
    tetrominoShapes[Math.trunc(Math.random() * tetrominoShapes.length)];
  console.log(TETROMINOS[randTetromino]);
  return TETROMINOS[randTetromino];
};
