import { setState } from "../../../utils/state.js"

const huafei = (state={}, action) => {
  switch(action.type){
    case "SET_CURPHONE":
    case "QUERY_HUAFEI":
    case "SET_NUMBER_INFO":
    case "SHOW_NOTICE":
    case "SELECTED_HF":
    case "SHOW_HISTORY":
    case "PHONE_HISTORY":
      return setState(state, action)
    default :
      return state
  }
}


export default huafei
