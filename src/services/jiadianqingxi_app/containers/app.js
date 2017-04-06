// common
import { connect } from 'react-redux'
import { wrap } from '@boluome/oto_saas_web_app_component'
import { get, send, getStore, merge } from '@boluome/common-lib';

// self
import { getListData } from '../actions/app.js'


import App from '../components/app'

const mapStateToProps = ( state ) => {

  console.log('state==========',state);

  const { getListData } = state

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
  componentWillMount: data => dispatch(getListData(data))
})


export default
  connect(mapStateToProps, mapDispatchToProps)(
    wrap(mapFunToComponent)(App)
  )
