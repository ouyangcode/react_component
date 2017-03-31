/*
  bug:优惠点击的事件，没有区分是平台活动还是红包，默认选的都是红包

  线上环境：/promotion/query_promotions 处取消header头中的appcode
  userId改为联合登陆userId
*/


// 引入react创建组件，connect将数据注入到组件中，引入子组件
import React from "react"
import {connect} from "react-redux"
import {send, setServerUrl, getStore} from "@boluome/common-lib"

import Order from "../components/Order"
import {changeOrder, changeCurDiscData} from "../actions/order.js"




let header = {
  "appcode": "boluome"
}
if(/^[\d]|localhost/.test(window.location.hostname)){
  setServerUrl("https://dev-api.otosaas.com")
}else{
  setServerUrl("/api")
  header.appcode = ""
}

// setServerUrl("https://dev-api.otosaas.com")

// const useId = "blm_test"     //本地
const useId = getStore("customerUserId", "session")     //线上

// 定义变量
const mapStateToProps = (state, props) => {
  // console.log("mapStateToProps",state);
  const [ currentOrg, service, filterBill, billNo, supplier ] =
  [ getStore("currentOrg", "session"), getStore("service", "session"), getStore("filterBill", "session"), getStore("billNo", "session"), getStore("supplier", "session") ]
  const curDiscountData = state.mySelected.curDiscountData
  const {mySelected, myService} = state
  return {
    ...mySelected,
    ...myService,
    currentOrg,
    service,
    filterBill,
    billNo,
    supplier
  }
}

//定义函数，函数中其实就是定义dispatch方法的使用
const mapDispatchToProps = (dispatch,props) => {
  console.log("props",props);
  return {
    dispatch,
    handleOrder: (data) => dispatch(changeOrder(data)),    //data中传过来的是一个数组[orderData, currentOrg],orderData代表的是请求下单参数，currentOrg代表请求成功后，保存到本地的数据
    // handlePromotionChange: (curDiscountData) => console.log("curDiscountData", curDiscountData)
    handlePromotionChange: (curDiscountData) => {console.log(curDiscountData); dispatch(changeCurDiscData(curDiscountData))}
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Order)
