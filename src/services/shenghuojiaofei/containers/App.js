
/**
问题：
    //{ categoryId }    //问题：在下一个ajax中，需要使用上一个ajax使用的参数，如何处理，下面这样两个下面的要用到上面返回的数据中的categoryId参数，但是他们是同级的，无法后去
**/

// 创建一个容器组件
// 引入react相关文件
import { browserHistory } from 'react-router'
import React, {PropTypes} from 'react';
import {connect} from "react-redux"
import { wrap } from '../../../utils/creater.js'
// 引入自定义组件和antd组件库
import App from "../components/App.js"
import { Toast } from 'antd-mobile'
import {get, setServerUrl, getStore, setStore} from "@boluome/common-lib"
// 引入scss
import "../styles/index.scss"

// 引入action
import {changeOrg, changeServer, changeCity, queryBill} from "../actions"
// 引入loading图
import {Loading} from "@boluome/oto_saas_web_app_component"

import {login} from "../../../utils/login.js"

if(/^[\d]|localhost/.test(window.location.hostname)){
  setServerUrl("https://dev-api.otosaas.com")
}else{
  setServerUrl("/api")
}

// setServerUrl("https://dev-api.otosaas.com")

const cityId = "021"
let defaultCategoryId = ""

const mapStateToProps = (state = { mySelected : { billInfo : "", currentOrg : "", supplier }}, props) => {     //connect的第一个参数，每次state改变,这个函数都会执行一次。他的参数是定死的，第一个参数代表的是state，第二个参数代表的是router之类的属性，无用
  console.log('mapStateToProps',state);
  const supplier = state.mySelected.supplier ? state.mySelected.supplier : "fft"
  setStore("billInfo", state.mySelected.billInfo, "session" ) //session中留存数据, bill页面
  setStore("currentOrg", state.mySelected.currentOrg, "session" ) //session中留存数据, bill页面
  setStore("supplier", supplier, "session" ) //session中留存数据, bill页面
  setStore("service", state.myService.service, "session" ) //session中留存数据, order页面
  setStore("billNo", state.myService.billNo, "session" ) //session中留存数据, order页面
  let { myService, mySelected } = state
  return {
    ...myService,
    ...mySelected,
    defaultCategoryId
  }
}
const mapDispatchToProps = (dispatch, props) => { //connect的第二个参数，每次state改变，只有对应的函数会执行一次，一般参数都是存到本地中，后期获取的，在这里可以通过定义一个全局变量sta，把上一个函数中的state传递过来
  let channel = "fft"
  return {
    dispatch,
    handleSupplier : supplier => {
      channel = supplier
      dispatch({type:"CHANGE_SUPPLIER", supplier})
    },
    handleDeliveryTimeChange: val => {
      dispatch(changeOrg(val[0]))
      dispatch({ type: 'INPUT_CHANGE', billNo : "" })    //清除当前input框中的内容
    },
    handleSelectServer: (categoryId) => {
      dispatch(changeServer({ cityId, categoryId, channel:channel }))    //改变当前选中的服务
      dispatch({ type: 'INPUT_CHANGE', billNo : "" })    //清除当前input框中的内容
    },
    handleInputChange: billNo => dispatch({ type: 'INPUT_CHANGE', billNo }),
    handlePwdChange: billPwd => dispatch({type:  "PWD_CHANGE", billPwd}),
    handleBillClick: (billNo, billPwd, currentOrgNeedPwd, filterOrg) => {
      // console.log("bill",billNo, filterOrg)
      if(filterOrg.length > 0) {
        const { validationExp, type, orgId, categoryId, barcode } = filterOrg[0]
        const EXP_IPT = new RegExp(validationExp, "gi")
        const paras = { billNo, billPwd, type, orgId, categoryId, channel:channel}
        if(barcode){
          paras.barcode = barcode
        }
        if(!EXP_IPT.test(billNo)){  //当时账号验证失败时，不可以查询账单
          Toast.info('请输入正确的号码', 1);
          return
        }
        // console.log('paras', paras);
        if(!/^\d{6}$/.test(billPwd) && currentOrgNeedPwd){  //当需要密码且输入密码验证失败时，不可以查询账单
          Toast.info("请输入6位密码", 1)
          return
        }
        dispatch(queryBill(paras))
      }
    }
  }
}

const mapFuncToComponent = (dispatch, state) => {   //整个生命周期只执行一次
  let { myService={service:[""]} } = state
  let categoryId = ""                               //问题：在下一个ajax中，需要使用上一个ajax使用的参数，如何处理，下面这样两个下面的要用到上面返回的数据中的categoryId参数，但是他们是同级的，无法后去

  return {
    componentWillMount: () => {
      const host         = location.host
      // const customerCode = host.replace(/(.test.otosaas.com|.otosaas.com)/, '')
      let customerCode = host.replace(/(.test.otosaas.com|.otosaas.com)/, '')
      console.log("customerCode", customerCode);
      //调用联合登陆方法
      login(customerCode)

      const closeLoading = Loading({ maskCloseable: false})   //当action中服务加载完成后，关闭loading图
      get("/shenghuojiaofei/v1/categories", {cityId:cityId, channel:"fft"}).then(({ code, data, message }) => {
        if(code === 0){
          // 设置defaultCategoryId的初始值
          defaultCategoryId = data[0].categoryId
          if(getStore("defaultCategoryId")){// 当缓存里有defaultCategoryId时
            defaultCategoryId = getStore("defaultCategoryId").type[1].categoryId
          }
          dispatch(changeServer({cityId:cityId, categoryId:defaultCategoryId, channel:"fft"}))  //设置第一个服务为默认服务，获取orgs
          //设置上海为默认的城市，执行一次action中changeCity成功后的内容，代替dispatch(changeCity({cityId:cityId, closeLoading}))，避免action中categories接口二次查询
          dispatch({ type: "CHANGE_CITY_DATA", service: data })
          dispatch({type: 'CHANGE_CURRENT_ORG', currentOrg: [ "", {orgName: ''} ]})
          closeLoading()
        }else{
          console.log(message);
        }
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(wrap(mapFuncToComponent)(App))
