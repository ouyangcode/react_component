// 引入react创建组件，connect为组件注入属性，方法，wrap方法为组件注入生命周期,子组件Huafei
import React from "react"
import {connect} from  "react-redux"
import { getStore, removeStore } from "@boluome/common-lib"
import { wrap } from '@boluome/oto_saas_web_app_component'
import { customerCode, login, getCustomerConfig } from 'business'

import Huafei from "../components/Huafei.js"
import { queryHuafeiList, changeSubmit } from "../actions/huafei.js"


const mapStateToProps = (state, props) => {
  const { huafei } = state
  console.log(state);
  const userPhone = getStore("userPhone", "session") ? getStore("userPhone", "session") : ""
  return {
    ...huafei,
    userPhone
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    dispatch,
    handleHfClick : (selectedHf) => {
      dispatch({ type:"SELECTED_HF", selectedHf })
    },
		handleClear : () => dispatch({ type: "SET_CURPHONE", curPhone:"" }),
    handleIptChange : ( content ) => {
			dispatch({ type:"SHOW_HISTORY", visibilityHistory:"true" })
      dispatch(queryHuafeiList( content ))
    },
    handlePhoneHistory : (curPhone) => {
			dispatch({type: "SET_CURPHONE", curPhone, visibilityHistory:""})
      dispatch(queryHuafeiList( curPhone ))
		},
    handleSubmit : orderInfo => changeSubmit(orderInfo),
    handleClearHistory : () => {
      removeStore('phoneHistorys')
      dispatch({ type:"PHONE_HISTORY", phoneHistorys: [] })
    }
  }
}

const mapFuncToComponent = ( dispatch, state ) => {
  return {
    componentDidMount : () => {
      getCustomerConfig(customerCode, err => {
        if(err) { //获取客户配置失败
          console.log('获取客户配置失败', err)
        } else {
          login(err => {  //登陆
            if(err) {
              //登陆失败
              console.log('登陆失败', err)
            } else {
              //将充值历史记录放倒store中
              let phoneHistorys = getStore("phoneHistory") ? getStore("phoneHistory").phoneHistorys : []
              dispatch({ type:"PHONE_HISTORY", phoneHistorys })
            }
          })
        }
      })

      if(window.otosaas) {
        otosaas.setTitle('话费充值')
      }

      // 模拟历史记录，测试时可以打开
      // const mockdata = ["182 5500 2974", "182 5510 2974", "182 5200 2974", "182 1500 2974", "182 5566 2974", "182 5591 2974"]
      // phoneHistorys = phoneHistorys ? phoneHistorys : mockdata


    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(wrap(mapFuncToComponent)(Huafei))
