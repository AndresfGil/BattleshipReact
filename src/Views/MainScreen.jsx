import React from 'react'
import logo from "../resources/Logo.png";
import { useDispatch } from 'react-redux';
import { setGameActive } from '../store/mainSlice';

export const MainScreen = () => {

    const dispatch = useDispatch();
    const onCLickSubmit = () => {
        dispatch(setGameActive(true))
    }

  return (
    <div className='screen-main-container'>
        <img src={logo} alt="Logo del mapa" width={100} height={100}/>
        <h1>Battleship</h1>
        <button 
        className="button"
        onClick={onCLickSubmit}
        > 
            Iniciar Juego
        </button>
    </div>
  )
}
