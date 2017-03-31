import React from 'react'

const App = ({ children, title = '' }) => (
  <div>
    <h1>Hello { title }</h1>
    <div>{ children }</div>
  </div>
)

export default App
