
import { setState } from '../../../utils/state'

const mySelected = (state = {}, action) => {
  switch (action.type) {
    case "CHANGE_DISCOUNT":
    case "CHANGE_SUPPLIER":
    case 'CHANGE_CURRENT_ORG':
    case "QUERY_BILL":
    case "PAY_BILL":
    case "CHANGE_DISCOUNT":
    case "GET_PROMOTION":
      return setState(state, action)
    default: return state
  }
}

export default mySelected
