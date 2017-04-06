import { combineReducers } from 'redux'
//引入reducers
import getListData  from './getListData';
import getDetailsData  from './details'
//组合reducers
export default combineReducers({
    getListData,
    getDetailsData
})
