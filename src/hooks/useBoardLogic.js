// useBoardLogic.js
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCleanPlayerBoard, setEnemyShips, setPlayerBoard, updateBoard } from '../store/mainSlice';
import { generateRandomShips } from '../helpers/getRandomShips';

const useBoardLogic = (inputValue, handleInputChange, handleSubmit) => {
  const dispatch = useDispatch();
  const boardSize = 10;

  const playerBoard = useSelector((state) => state.main.playerBoard);
  const ships = useSelector((state) => state.main.enemyShips);

  const [selectedCoordinates, setSelectedCoordinates] = useState([]);

  useEffect(() => {
    const { ships, updatedBoard } = generateRandomShips(boardSize, 1, 4);

    dispatch(setPlayerBoard(updatedBoard));
    dispatch(setEnemyShips(ships));
  }, []);

  const getMatrixIndex = (row, col) => {
    const rowIndex = col - 1;
    const colIndex = row.charCodeAt(0) - 'A'.charCodeAt(0);
    return { rowIndex, colIndex };
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Validar la entrada
    const validInput = /^[A-J]10$|^[A-J][1-9]$/.test(inputValue.toUpperCase());

    if (validInput) {
      const row = inputValue.slice(0, -1).toUpperCase();
      const col = parseInt(inputValue.slice(1), 10);

      const { colIndex, rowIndex } = getMatrixIndex(row, col);

      // Verificar si la coordenada ya ha sido seleccionada
      if (selectedCoordinates.some((coord) => coord[0] === rowIndex && coord[1] === colIndex)) {
        // Coordenada repetida, no hacer nada
        return;
      }

      // Agregar la coordenada a las seleccionadas
      setSelectedCoordinates([...selectedCoordinates, [rowIndex, colIndex]]);

      // Verificar si hay un barco enemigo en la posición seleccionada
      const isHit = ships.some((ship) =>
        ship.some(([shipRow, shipCol]) => shipRow === rowIndex && shipCol === colIndex)
      );

      console.log('Coordenada ingresada:', row, col);
      console.log('Posición del barco enemigo:', ships);

      console.log('Estado actual del tablero:');
      console.log(playerBoard.map((row) => row.join(' ')).join('\n'));

      // Actualizar el estado del tablero según la presencia de un barco enemigo
      const newValue = isHit ? 'O' : 'X';
      dispatch(updateBoard({ rowIndex, colIndex, value: newValue }));

      console.log('Nuevo estado del tablero:');
      console.log(playerBoard.map((row) => row.join(' ')).join('\n'));

      // Limpiar el input después de procesar la coordenada
      handleInputChange('');

      // Mostrar la coordenada en la consola para verificar
      console.log(`Coordenada ingresada: ${row}${col}`);
    }
  };

  return { handleFormSubmit, playerBoard, handleInputChange };
};

export default useBoardLogic;