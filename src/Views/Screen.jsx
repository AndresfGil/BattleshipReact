import React from 'react'
import { useSelector } from 'react-redux'
import { MainScreen } from './MainScreen'
import { Board, Title } from '../components'


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
