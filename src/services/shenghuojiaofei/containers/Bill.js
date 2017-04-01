import react from "react"
import {connect} from "react-redux"
import Bill from '../components/Bill'
import { setStore, getStore } from "@boluome/common-lib"

import {browserHistory} from "react-router"

const mapStateToProps  = (state={ mySelected: { filterBill: "" }  }, props) => {
  console.log("mapStateToProps",state);
  setStore("filterBill", state.mySelected.filterBill, "session" ) //session中留存数据, order页面
  const [ billInfo, currentOrg, supplier ] = [ getStore("billInfo", "session"), getStore("currentOrg", "session"), getStore("supplier", "session") ]
  return {
    // ...mySelected
    billInfo,
    currentOrg,
    supplier
  }
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    dispatch,
    handlePay: (billStatus, filterBill) => {   //传过来的是当前订单状态，当订单状态是03时，对应的是未支付状态，才能去支付
      // console.log('filterBill',filterBill);
      if(billStatus == "00"){
        dispatch({type:"PAY_BILL", filterBill:filterBill})
        browserHistory.push("/order")
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bill)
