// common
import { connect } from 'react-redux'
import { wrap } from '@boluome/oto_saas_web_app_component'
import { get, send, getStore, merge } from '@boluome/common-lib';

// self
import { getDetailsData } from '../actions/details.js'

import Details from '../components/details'

const mapStateToProps = ( state ) => {

  console.log('state==========',state);

  const { getDetailsData } = state

  return{
    ...getListData
  }
}

const mapDispatchToProps = dispatch => {
    return {
      dispatch,
      // getListData : data => dispatch(getListData(data))
    }
}

const mapFunToComponent  = dispatch => ({
  // componentDidMount: () => console.log('root mounted')
  componentWillMount: data => dispatch( getDetailsData(data))
})


export default
  connect(mapStateToProps, mapDispatchToProps)(
    wrap(mapFunToComponent)(App)
  )
