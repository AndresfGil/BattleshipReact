import React, { useEffect, useState } from "react";
import { Square } from "./Square";
import { useDispatch, useSelector } from "react-redux";
import { setCleanPlayerBoard, setEnemyShips, setPlayerBoard, updateBoard } from "../store/mainSlice";
import { generateRandomShips } from "../helpers/getRandomShips";

export const Board = () => {
  const dispatch = useDispatch();
  const boardSize = 10;
  const initialBoard = Array.from({ length: boardSize }, () => Array(boardSize).fill(""));
  const [board, setBoard] = useState(initialBoard);
  const [inputValue, setInputValue] = useState("");

  const playerBoard = useSelector((state) => state.main.playerBoard);

  const { ships, updatedBoard } = generateRandomShips(boardSize, 5, 4);
  console.log("Barcos enemigos: ", ships)

  useEffect(() => {
    dispatch(setPlayerBoard(updatedBoard));
    dispatch(setEnemyShips(ships))
  }, [dispatch]);




  
  const getMatrixIndex = (row, col) => {
    const rowIndex = col - 1;
    const colIndex = row.charCodeAt(0) - "A".charCodeAt(0);
    return { rowIndex, colIndex };
  };


  const handleInputChange = (event) => {
    setInputValue(event.target.value.toUpperCase());
  };


  const handleFormSubmit = (event) => {
    event.preventDefault();
  
    // Validar la entrada
    const validInput = /^[A-J]10$|^[A-J][1-9]$/.test(inputValue.toUpperCase());
  
    if (validInput) {
      const row = inputValue.slice(0, -1).toUpperCase(); // Obtener la parte de la fila sin el último carácter
      const col = parseInt(inputValue.slice(1), 10) ; // Obtener la parte de la columna y restar 1
  
      // Obtener índices de matriz utilizando la función getMatrixIndex
      const { colIndex, rowIndex } = getMatrixIndex(row, col);
  
      // Verificar si la fila ya está inicializada, si no, inicializarla
      dispatch(updateBoard({ rowIndex, colIndex, value: 'X'}));
  
      // Realizar la lógica para actualizar el estado del tablero
      // Puedes verificar si la casilla ya ha sido marcada, etc.
      // Por ahora, actualizaremos el estado de una casilla específica a "marcada"
  
      // Limpiar el input después de procesar la coordenada
      setInputValue("");
  
      // Mostrar la coordenada en la consola para verificar
      console.log(`Coordenada ingresada: ${row}${col}`);
    } else {
    }
  };

  const handleClearClick = (event) => {
    event.preventDefault();
    dispatch(setCleanPlayerBoard(initialBoard))
  }


  



  return (
    <div>
      <div className="comands-container">
        <h3 className="comands-title">Barcos destruidos: </h3>

        <label className="commands-text">Comandos:</label>

        <form className="d-flex w-100" onSubmit={handleFormSubmit}>
          <div className="mb-3 flex-grow-1 d-flex align-items-end">
            <input
              type="text"
              className="form-control command-input"
              id="commandInput"
              value={inputValue}
              onChange={handleInputChange}
            />
          </div>

          <button
            className="btn btn-outline-secondary mx-2 command-button"
            type="button"
            onClick={handleFormSubmit}
          >
            Ejecutar
          </button>

          <button
            className="btn btn-outline-secondary command-button"
            type="button"
            onClick={handleClearClick}
          >
            Limpiar
          </button>
        </form>
      </div>

      <div className="board">
      {/* Letras de la A a la J en el lado izquierdo */}
      <div className="row">
        <div className="square"></div>
        {Array.from({ length: boardSize }, (_, index) => (
          <div key={index} className="square header-square">
            {String.fromCharCode(index + 'A'.charCodeAt(0))}
          </div>
        ))}
      </div>

      {/* Números del 1 al 10 en la parte superior */}
      {playerBoard.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          <div className="square header-square">
            {rowIndex + 1}
          </div>
          {row.map((cell, colIndex) => (
            <Square
              key={colIndex}
              value={cell}
              onClick={() => {}}
            />
          ))}
        </div>
      ))}
    </div>

      
    </div>
  );
};
