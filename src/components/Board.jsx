import Swal from "sweetalert2";
import { Square } from "./Square";
import logo from "../resources/Boat.png";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generateRandomShips } from "../helpers/getRandomShips";
import { setCleanPlayerBoard, setEnemyShips, setGameActive, setPlayerBoard, updateBoard } from "../store/mainSlice";


export const Board = () => {
  const dispatch = useDispatch();
  const boardSize = 10;
  const [inputValue, setInputValue] = useState("");
  const playerBoard = useSelector((state) => state.main.playerBoard);
  const ships = useSelector((state) => state.main.enemyShips);
  const [shipsDestroyed, setShipsDestroyed] = useState(0);


  useEffect(() => {
    const { ships, updatedBoard } = generateRandomShips(boardSize, 5, 4);

    dispatch(setPlayerBoard(updatedBoard));
    dispatch(setEnemyShips(ships));
  }, []);


  const getMatrixIndex = (row, col) => {
    const rowIndex = col - 1;
    const colIndex = row.charCodeAt(0) - "A".charCodeAt(0);
    return { rowIndex, colIndex };
  };


  const handleInputChange = (event) => {
    setInputValue(event.target.value.toUpperCase());
  };

  
  const [selectedCoordinates, setSelectedCoordinates] = useState([]);

  
  useEffect(() => {
    // Verificar si todos los barcos han sido destruidos
    if (ships.length > 0 && selectedCoordinates.length > 0) {
      const shipsDestroyed = ships.filter((ship) =>
        ship.every(([shipRow, shipCol]) =>
          selectedCoordinates.some(
            (coord) => coord[0] === shipRow && coord[1] === shipCol
          )
        )
      ).length;

      if (shipsDestroyed === ships.length) {
        dispatch(setGameActive(false));
        Swal.fire({
          title: "¡Felicidades!",
          text: "Has ganado el juego. Todos los barcos enemigos han sido destruidos.",
          icon: "success",
          confirmButtonText: "Jugar de nuevo",
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(setGameActive(false));
          }
        });
      }

      setShipsDestroyed(shipsDestroyed);
    }
  }, [selectedCoordinates]);


  const handleFormSubmit = (event) => {
    event.preventDefault();

    const validInput = /^[A-J]10$|^[A-J][1-9]$/.test(inputValue.toUpperCase());

    if (validInput) {
      const row = inputValue.slice(0, -1).toUpperCase();
      const col = parseInt(inputValue.slice(1), 10);

      const { colIndex, rowIndex } = getMatrixIndex(row, col);

      const isCoordinateSelected = selectedCoordinates.some(
        (coord) => coord[0] === rowIndex && coord[1] === colIndex
      );

      if (!isCoordinateSelected) {
        setSelectedCoordinates([...selectedCoordinates, [rowIndex, colIndex]]);
      }

      const isHit = ships.some((ship) =>
        ship.some(
          ([shipRow, shipCol]) => shipRow === rowIndex && shipCol === colIndex
        )
      );

      const newValue = isHit ? "O" : "X";
      dispatch(updateBoard({ rowIndex, colIndex, value: newValue }));

    }
    setInputValue("");
  };


  const handleClickAndReload = (event) => {
    event.preventDefault();
    const { ships, updatedBoard } = generateRandomShips(boardSize, 5, 4);

    dispatch(setCleanPlayerBoard({ updatedBoard, ships }));
    setShipsDestroyed(0);
  };


  return (
    <div>
      <div className="comands-container">
        <h3 className="comands-title">
          {" "}
          <img src={logo} alt="Logo del mapa" width={30} height={30} /> Barcos
          destruidos: {shipsDestroyed}{" "}
        </h3>

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
            onClick={handleClickAndReload}
          >
            Limpiar
          </button>
        </form>
      </div>

      <div className="board">
        <div className="row">
          <div className="square"></div>
          {Array.from({ length: boardSize }, (_, index) => (
            <div key={index} className="square header-square">
              {String.fromCharCode(index + "A".charCodeAt(0))}
            </div>
          ))}
        </div>

        {playerBoard.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            <div className="square header-square">{rowIndex + 1}</div>
            {row.map((cell, colIndex) => (
              <Square key={colIndex} value={cell} onClick={() => {}} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
