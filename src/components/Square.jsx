import React from 'react'

export const Square = ({ value = 0, onClick }) => {
  return (
    <div className='square'>
        {value}
    </div>
  )
}
