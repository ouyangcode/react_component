import React from 'react'
import { Link } from 'react-router'

const App = ({ children, title = '' }) => (
  <div>
    <h2>{ title }</h2>
    <div>
      <Link to='/demo' >首页</Link>
      <Link to='/demo/page1' >异步测试</Link>
      <Link to='/demo/page2' >占位页</Link>
    </div>

    <div>
      { children }
    </div>
  </div>
)

export default App
