import React from 'react'

const Button = ({ el, id, handleClick }) => {
  let style = {
    backgroundColor: '#0e1514',
    color: '#398071'
  }

  if (el === '+' || el === '-' || el === '*' || el === '/') {
    style = {
      backgroundColor: '#398071',
      color: '#e7e7e7'
    }
  }

  return (
    <button style={style} id={id} className='text-[26px] w-[3.5rem] aspect-square rounded-full flex items-center justify-center' onClick={(e) => handleClick(e)}>{el}</button>

  )
}

export default Button