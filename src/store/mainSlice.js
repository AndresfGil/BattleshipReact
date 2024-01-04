
import { createSlice } from "@reduxjs/toolkit";


export const mainSlice = createSlice({

    name: "main",
    initialState: {
        playerBoard:[],
        enemyShips:[],
    },

    reducers: {
        setPlayerBoard: (state, action) => {
            return { ...state, playerBoard: action.payload };
        },
        setEnemyShips: (state, action) => {
            state.enemyShips = action.payload;
        },
        setCleanPlayerBoard: (state, action) => {
            state.playerBoard = action.payload
        },
        updateBoard: (state, action) => {
            const { rowIndex, colIndex, value } = action.payload;
            state.playerBoard[rowIndex][colIndex] = value;
        }
    }
});

export const { setPlayerBoard, setEnemyShips, setCleanPlayerBoard, updateBoard } = mainSlice.actions;
