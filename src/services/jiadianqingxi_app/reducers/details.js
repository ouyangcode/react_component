import { mergeState } from '@boluome/common-lib'
const initialState = {
    title: 'jiadianqingxi_app'
}
const getDetailsData = (state = initialState, action) => {
  switch (action.type) {
    case 'KJIN_DETAILSHOW':
        return mergeState(state, action)
    default: return state
  }
}

export default getDetailsData
