import { setState } from '../../../utils/state'

const initialState = {}

const myService = (state = initialState, action) => {
  switch (action.type) {
    // case 'CHANGE_DELIVERKY_TIME':    //也可以把配送时间和服务的都写在一个分枝上，这里是分别卸载了service和deliveryTime上
    case "CHANGE_SERVER_DATA":
    case "CHANGE_CITY_DATA":
    case 'INPUT_CHANGE':
    case 'PWD_CHANGE':
      return setState(state, action)
    default:
      return state
  }
}

export default myService
