import React from 'react'
import './index.scss'

export default (
  () => (
    <div className="loading-bro">
      <svg id="load" x="0px" y="0px" viewBox="0 0 150 150">
        <circle id="loading-inner" cx="75" cy="75" r="60"/>
     </svg>
     <span style={{
       color: 'rgb(255, 255, 255)',
       fontSize: '28px',
       display: 'block',
       verticalAlign: 'top',
       paddingTop: '19px',
       marginLeft: '30px',
     }}
     >
      测试一下测试测试一下测试
     </span>
    </div>
  )
)
