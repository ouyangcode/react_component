import { mergeState } from '@boluome/common-lib'
const initialState = {
    title: 'jiadianqingxi_app'
}
const getListData = (state = initialState, action) => {
  switch (action.type) {
    case 'KJIN_LISTSHOW':
        return mergeState(state, action)
    default: return state
  }
}

export default getListData
