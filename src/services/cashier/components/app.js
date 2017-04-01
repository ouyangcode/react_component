import React from 'react'

// import Cashier from '../containers/cashier'
const App = ({ children }) => (
   <div ref={ () => document.title = '收银台' }>
      { children }
   </div>
)

export default App
