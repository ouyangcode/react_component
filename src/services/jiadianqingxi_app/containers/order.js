// common
import { connect } from 'react-redux'
import { wrap } from '@boluome/oto_saas_web_app_component'
import { get, send, getStore, setStore, merge } from '@boluome/common-lib';
import { customerCode, getCustomerConfig, login, getLocation, unionLogin } from 'business'
// self
import { getDetailsData } from '../actions/details.js'

import Order from '../components/Order'

const mapStateToProps = ( state ) => {

  console.log('state==========',state);

  const { getDetailsData, order } = state
  console.log(order)
  return{
    ...getDetailsData,
    ...order
  }
}

const mapDispatchToProps = dispatch => {
    return {
      dispatch,
      handleChangeContact: contact => {
        dispatch({ type: "CHANGE_CONTACT", contact})
      }
      // goOrderPage : (Id) => {
      //    browserHistory.push('/jiadianqingxi_app/order?categoryId='+Id)
      // }
    }
}

const mapFunToComponent  = dispatch => ({
  // componentDidMount: () => console.log('root mounted')
  componentWillMount: data => {
    getCustomerConfig(customerCode, err => {
      login(err => {
        if(err) {
          console.log(err)
          setStore('customerUserId', 'blm_test', 'session')
          setStore('customerUserId', 'blm_test')
        } 
        getLocation(err => {
          dispatch( getDetailsData(data))
        })

      })
    })
  }
})


export default
  connect(mapStateToProps, mapDispatchToProps)(
    wrap(mapFunToComponent)(Order)
  )
