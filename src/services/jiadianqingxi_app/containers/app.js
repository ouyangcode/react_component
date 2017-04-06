// common
import { connect } from 'react-redux'
import { wrap } from '@boluome/oto_saas_web_app_component'
import { get, send, getStore, merge } from '@boluome/common-lib';

// self
import { getListData } from '../actions/app.js'

import App from '../components/app'

const mapStateToProps = ( state ) => {    //给组建、件添加属性

  console.log('state==========',state);

  const { getListData } = state

  return{
    ...getListData
  }
}

const mapDispatchToProps = dispatch => {    //添加方法
    return {
      dispatch,
      getListData : res => {
        console.log('res',res);
        dispatch({ type:"CHANGE_SELECTED_CITY", selectedCIty:res.name })
klmkmkmkmkmlml

      },
      goDetails : ( cityId , Id) => {
         browserHistory.push('/details')
      }
    }
}

// const mapFunToComponent  = (dispatch, state) => ({    //添加生命周期
//   // componentDidMount: () => console.log('root mounted')
//   componentWillMount: data => dispatch(getListData(data))
// })

const mapFunToComponent = (dispatch, state) => {   //整个生命周期只执行一次
  return {
    componentWillMount: () => {
      if(!state.selectedCity){
        // 获取当前定位城市
        const geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(res => {
          const localCity = res.address.city.replace(/["省", "市", "县", "区"]/,"")
          dispatch({ type:"CHANGE_SELECTED_CITY", selectedCIty:localCity })
          dispatch( getListData(localCity))
        })
      }
    }
  }
}


export default
  connect(mapStateToProps, mapDispatchToProps)(
    wrap(mapFunToComponent)(App)
  )
