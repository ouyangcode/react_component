import React from 'react'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

const Routes = (
    <Router history={ browserHistory } >
      <Route path='/' component={ require('react-router?name=root!./app') } />
    </Router>
)

export default Routes
