
import { get, send } from '@boluome/common-lib'

export const fetchOrderLite = id => dispatch => {
  get(`/order/v1/lite/${ id }`)
  .then(({ code, data, message }) => {
    if(code === 0) {
      dispatch(togglePageLoading({ loading: false }))
      dispatch({ type: 'FETCH_ORDER_LITE_SUCCESS', orderlite: data })
    } else {
      console.log(message)
    }
  })
}

export const togglePageLoading = data => {
  return {
    type: 'TOGGLE_PAGE_LOADING',
    ...data
  }
}
