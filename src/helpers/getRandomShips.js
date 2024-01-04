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
      const position = isVertical ? [rowIndex + i, colIndex] : [rowIndex, colIndex + i];
      positions.push(position);
    }
  
    return positions;
  };
  
  const isValidPlacement = (board, positions) => {
    return positions.every(([row, col]) => board[row] && board[row][col] === "");
  };
  
  const placeShipOnBoard = (board, positions) => {
    return board.map((row, rowIndex) => {
      return row.map((cell, colIndex) => {
        return positions.some(([rowPos, colPos]) => rowPos === rowIndex && colPos === colIndex) ? "ship" : cell;
      });
    });
  };
  
  export const generateRandomShips = (boardSize, shipCount, shipSize) => {
    let board = Array.from({ length: boardSize }, () => Array(boardSize).fill(""));
  
    const ships = [];
  
    while (ships.length < shipCount) {
      const positions = generateRandomPosition(board.length, shipSize);
  
      if (isValidPlacement(board, positions)) {
        ships.push(positions);
        // Actualiza el estado del tablero para marcar las posiciones del barco
        board = placeShipOnBoard(board, positions);
      }
    }
  
    return { ships, updatedBoard: board };
  };