import { createSlice } from "@reduxjs/toolkit";

export const mainSlice = createSlice({
  name: "main",
  initialState: {
    playerBoard: [],
    enemyShips: [],
    isGameActive: false,
  },

  reducers: {
    setPlayerBoard: (state, action) => {
      state.playerBoard = action.payload;
    },
    setEnemyShips: (state, action) => {
      state.enemyShips = action.payload;
    },
    setCleanPlayerBoard: (state, action) => {
      const { updatedBoard, ships } = action.payload;
      state.playerBoard = updatedBoard;
      state.enemyShips = ships;
    },
    updateBoard: (state, action) => {
      const { rowIndex, colIndex, value } = action.payload;
      state.playerBoard[rowIndex][colIndex] = value;
    },
    setGameActive: (state, {payload}) => {
      state.isGameActive = payload;
    }
  },
});

export const {
  setPlayerBoard,
  setEnemyShips,
  setCleanPlayerBoard,
  updateBoard,
  setGameActive,
} = mainSlice.actions;
