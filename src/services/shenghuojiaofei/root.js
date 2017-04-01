import React from 'react'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk        from 'redux-thunk'
import reducers     from './reducers'

//由Reducers创建状态树
const store = createStore(reducers, applyMiddleware(thunk))
//定义根组件
const Root = () => (<Provider store={ store }><Routes /></Provider>)

export default Root

//路由配置
const Routes = () => (
  <Router history={ browserHistory } >
    <Route path='/' component={ require('react-router?name=app!./containers/App') } />
    <Route path='/bill' component={ require('react-router?name=bill!./containers/Bill') } />
    <Route path='/order' component={ require('react-router?name=order!./containers/Order') } />
  </Router>
)
