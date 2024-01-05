import React from 'react'
import { Board, Title } from '../components'
import { useSelector } from 'react-redux'
import { MainScreen } from './MainScreen'


export const Screen = () => {


const isActiveStatus = useSelector((state) => state.main.isGameActive)


  return (
    <>
      {isActiveStatus === false ? (
        
        <MainScreen/>
        
      ): (
        <div className='screen-container'>
        <Title/>
        <Board/>
        </div> 
      )} 
     
    </>
  )
}
