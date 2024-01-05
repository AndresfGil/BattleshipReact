const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateRandomPosition = (boardSize, shipSize) => {
  const isVertical = Math.random() < 0.5;
  const maxStartIndex = boardSize - (isVertical ? shipSize : 1);
  const rowIndex = getRandomInt(0, maxStartIndex);
  const colIndex = getRandomInt(0, maxStartIndex);


  const positions = [];

  for (let i = 0; i < shipSize; i++) {
    const position = isVertical
      ? [rowIndex, colIndex + i]
      : [rowIndex + i, colIndex];
    positions.push(position);
  }

  return positions;
};


const isValidPlacement = (board, positions) => {
  return positions.every(([row, col]) => board[row] && board[row][col] === "");
};

const placeShipOnBoard = (board, positions) => {
  const newBoard = board.map((row) => [...row]);

  positions.forEach(([rowPos, colPos]) => {
    newBoard[rowPos][colPos] = "";
  });

  return newBoard;
};


export const generateRandomShips = (boardSize, shipCount, shipSize) => {
  let board = Array.from({ length: boardSize }, () =>
    Array(boardSize).fill("")
  );

  const ships = [];

  while (ships.length < shipCount) {
    const positions = generateRandomPosition(board.length, shipSize);

    if (isValidPlacement(board, positions)) {
      ships.push(positions);
      board = placeShipOnBoard(board, positions);
    }
  }
  

  return { ships, updatedBoard: board };
};
