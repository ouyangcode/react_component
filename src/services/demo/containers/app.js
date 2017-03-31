import { connect } from 'react-redux'
import { wrap } from '@boluome/oto_saas_web_app_component'

import { changePage } from '../actions'

import App from '../components/app'

const mapStateToProps = state => {
  const { app } = state

  return {
    ...app
  }
}

const mapDispatchToProps = dispatch => ({ dispatch })

const mapFunToComponent  = dispatch => ({
  // componentWillReciveProps: () => console.log('recive props'),
  // componentWillUpdate     : () => console.log('will update'),
  // componentWillMount      : () => console.log('will mount'),
  // componentDidUpdate: () => console.log('root update'),
  componentDidMount: () => {
    console.log('root mounted')
    dispatch(changePage('首页的Title'))
  }
})

export default
  connect(mapStateToProps, mapDispatchToProps)(
    wrap(mapFunToComponent)(App)
  )
