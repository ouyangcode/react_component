// 引入combineReducers来合并多个reducers为一个主reducers
import {combineReducers} from "redux"
import myService from './myService'
import mySelected from './mySelected'
const reducers = combineReducers({ myService, mySelected })

export default reducers
