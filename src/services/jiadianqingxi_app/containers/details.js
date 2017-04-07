// common
import { connect } from 'react-redux'
import { wrap } from '@boluome/oto_saas_web_app_component'
import { get, send, getStore, merge } from '@boluome/common-lib';
import { browserHistory } from 'react-router'

// self
import { getDetailsData } from '../actions/details.js'

import Details from '../components/details'

const mapStateToProps = ( state ) => {

  console.log('state==========',state);

  const { getDetailsData } = state

  return{
    ...getDetailsData
  }
}

const mapDispatchToProps = dispatch => {
    return {
      dispatch,
      goBackPage : (cityId, Id) => {
         browserHistory.push('/jiadianqingxi_app/order?cityId='+cityId+'&categoryId='+Id)
      }
    }
}

const mapFunToComponent  = dispatch => ({
  // componentDidMount: () => console.log('root mounted')
  componentWillMount: data => dispatch( getDetailsData(data))
})


export default
  connect(mapStateToProps, mapDispatchToProps)(
    wrap(mapFunToComponent)(Details)
  )
