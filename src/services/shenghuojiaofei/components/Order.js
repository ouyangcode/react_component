import "../styles/order.scss"
// 引入react， antd中对应组件， 其他默认组件
import React from "react"
import {List, WhiteSpace} from "antd-mobile"
// import PromotionDemo,{PromotionDisplayDemo} from "./Promotion.js"
// import {Promotion, PromotionDisplay} from "@boluome/oto_saas_web_app_component"
import { Promotion, PromotionDisplay } from '@boluome/oto_saas_web_app_component'
import { getStore } from "@boluome/common-lib"


const customerUserId = getStore("customerUserId", "session")
const userPhone = getStore("userPhone", "session")

// const customerUserId = "blm_test"
// const userPhone = "13784587485"


const Order = ({currentOrg, service, filterBill, billNo, handleOrder, handlePromotionChange, curDiscountData={ coupon:{}, activity:{}, discount:"0"}, supplier="fft" }) => {
console.log('curDiscountData', curDiscountData.coupon, curDiscountData.activity, curDiscountData.discount);
  const payType = service.filter(item => item.categoryId == currentOrg[1].categoryId)[0].blmName
  const billTime = filterBill.date
  const billPrice = filterBill.price
  const typeName = currentOrg[1].typeName
  const billOrgName = filterBill.orgName
  const orderInfoTop = [{left:"缴费类型", right: payType+"账单"}, {left:"账期", right:billTime}, {left:"账期金额", right: "¥ "+billPrice}, {left:typeName, right:billNo}, {left:"出账机构", right: billOrgName}];
  supplier = supplier ? supplier : "fft"
  let orderData =  {
    "userId" : customerUserId,
    userPhone : userPhone,
    "billNo" : billNo,
    type : currentOrg[1].type,
    date : billTime.replace(/[^0-9]+/g, ''),
    orgId : currentOrg[1].orgId,
    channel : supplier,
    couponId : curDiscountData.coupon ? curDiscountData.coupon.id : "",
    activityId : curDiscountData.activity ? curDiscountData.activity.id : ""
  }
  // fft必填项
  if(supplier == "fft"){
    orderData.billId = filterBill.billId;   //接口没返回过billId
    orderData.categoryName = payType
    orderData.orgName = billOrgName
    orderData.queryName = typeName
    orderData.barcode = filterBill.barcode
  }

  // const billPrice = "111"
  // 下面ul中是依靠上层数据，调试使用，可以暂时吧ul移动出来


  return (
    <div className="my-order">
      <WhiteSpace size='lg' />
      <ul className="bill-list">
        {
          orderInfoTop.map((item, index) => (
            <li key = {index}>
              <h1>{item.left}</h1>
              <p>
                <span className="status" style = {{color: index == 2 ? "#f66" : "rgb(17,17,17)" }}>{item.right}</span>
              </p>
            </li>
          ))
        }
      </ul>
        <WhiteSpace size='lg' />
        <Promotion handleChange={ handlePromotionChange } orderType="shenghuojiaofei" channel={ supplier } amount={ billPrice } />
        <p className="supLog">付费通为您服务</p>
      <List className="order-Info-bottom">
        <ul className="bill-list">
          <li className="orderTotlePrice">
            <h1>订单总额</h1>
            <p>
              <span className="status" style = {{color: "#f66"}}>{"¥ " + billPrice}</span>
            </p>
          </li>
        </ul>
        <PromotionDisplay coupon={ curDiscountData.coupon } activity={ curDiscountData.activity } />
      </List>
      <div className="footer">
        <h1>{ "¥ " + parseInt((billPrice - curDiscountData.discount)*100)/100 }</h1>
        <p onClick={() => handleOrder([orderData, currentOrg])}>立即缴费</p>
      </div>
    </div>
  )
}

export default Order
