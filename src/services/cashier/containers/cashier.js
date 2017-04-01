import { connect }  from 'react-redux'
import { wrap }     from '@boluome/oto_saas_web_app_component'
import { getStore } from '@boluome/common-lib'
import { pay, paymentEnum } from 'business'

import { fetchOrderLite, togglePageLoading } from '../actions'
import Cashier from '../components/cashier'


const mapStateToProps = ({ cashier }, { params }) => {
  let   customerPayment = []
  let { payments } = getStore('customerConfig', 'session')
  if(payments) {
    customerPayment = payments.map(payment => payment.channelCode)
    // console.log(customerPayment)
  }
  // customerPayment = ['blmsdk']
  const { currentPayment = paymentEnum[customerPayment[0]], orderlite } = cashier

  return {
    ...params,
    orderlite,
    currentPayment,
    customerPayment
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    handleChangePayment: currentPayment => {
      dispatch({ type: 'CHANGE_PAYMENT', currentPayment })
    },
    handlePay: (order, payment, handler) => {
      pay(payment)(order)
    }
  }
}

const mapFuncToComponent = (dispatch, { orderId }) => {
  return {
    componentWillMount: () => {
      dispatch(togglePageLoading({ loading: true }))
      dispatch(fetchOrderLite(orderId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(wrap(mapFuncToComponent)(Cashier))
