import React from 'react'

const Page1 = ({ handleStart, handleStop, num = 0 }) => (
  <div>
    <div style={{ margin: '.32rem 0', fontSize: '.3rem' }}>{ num }</div>
    <button onClick={ () => handleStart(100) } style={ buttonStyle } >快</button>

    <button onClick={ () => handleStart(1000) } style={ buttonStyle } >慢</button>

    <button onClick={ handleStop } style={ buttonStyle } >停止</button>
  </div>
)

export default Page1

const buttonStyle = {
  border : '1px solid #ccc',
  padding:'.1rem .32rem',
  marginRight: '.2rem',
  fontSize: '.3rem'
}
