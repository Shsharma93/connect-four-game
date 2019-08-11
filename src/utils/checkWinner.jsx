
const checkWinner = board => {
  return (
    checkVertically(board) ||
    checkDiagonallyLeft(board) ||
    checkDiagonallyRight(board) ||
    checkHorizontally(board)
  );
};

const checkVertically = board => {
  for (let y = 3; y < 6; y++) {
    for (let x = 0; x < 7; x++) {
      if (board[y][x]) {
        if (
          board[y][x] === board[y - 1][x] &&
          board[y][x] === board[y - 2][x] &&
          board[y][x] === board[y - 3][x]
        ) {
          return board[y][x];
        }
      }
    }
  }
};

const checkHorizontally = board => {
  for (let y = 0; y < 6; y++) {
    for (let x = 0; x < 4; x++) {
      if (board[y][x]) {
        if (
          board[y][x] === board[y][x + 1] &&
          board[y][x] === board[y][x + 2] &&
          board[y][x] === board[y][x + 3]
        ) {
          return board[y][x];
        }
      }
    }
  }
};

const checkDiagonallyLeft = board => {
  for (let y = 3; y < 6; y++) {
    for (let x = 3; x < 7; x++) {
      if (board[y][x]) {
        if (
          board[y][x] === board[y - 1][x - 1] &&
          board[y][x] === board[y - 2][x - 2] &&
          board[y][x] === board[y - 3][x - 3]
        ) {
          return board[y][x];
        }
      }
    }
  }
};

const checkDiagonallyRight = board => {
  for (let y = 3; y < 6; y++) {
    for (let x = 0; x < 4; x++) {
      if (board[y][x]) {
        if (
          board[y][x] === board[y - 1][x + 1] &&
          board[y][x] === board[y - 2][x + 2] &&
          board[y][x] === board[y - 3][x + 3]
        ) {
          return board[y][x];
        }
      }
    }
  }
};

export default checkWinner;
