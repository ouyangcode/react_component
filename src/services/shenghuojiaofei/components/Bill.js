import "../styles/common.scss"

import "../styles/bill.scss"

import React from "react"
import {List, WhiteSpace} from "antd-mobile"
import Supplier from "./Supplier.js"
import arrowRight from "../img/arrowRight.png"

const Item = List.Item

const Bill = ({ billInfo = { code: "" }, currentOrg, handlePay, supplier="fft" }) => {
  // mockData:
  // billInfo = {
  //   code:0,
  //   data:{
  //     billList:[{barcode:"271077445170110000251807",date:"2017年01月",price:"251.80",status:"03"}],
  //     billNo:"271077445",
  //     org:{
  //       id:"888880002302900",name:"上海城投水务（集团）有限公司"
  //     },
  //   },
  //   type:"0",
  //   message:"chulichenggon"
  // }

  if(billInfo.code === 0){
    return (
      <div>
        <Supplier supplier={supplier} showUser={false} />
        <List className="my-list">
          <Item extra={billInfo ? billInfo.data.billNo : ""}>{currentOrg[1].typeName}</Item>
          <Item extra={billInfo.data.org.name}>出账机构</Item>
        </List>
        <WhiteSpace />
        <WhiteSpace />
        <ul className="bill-list">
          {
            billInfo.data.billList.map(({price, barcode, billId, date, status}, index) => {
              let statusColor = ""
              let curStatus = ""
              if(status == "00"){
                statusColor = "rgb(255,55,55)"
                curStatus = "未支付"
              }
              if(status == "01"){
                statusColor = "rgb(109,109,109)"
                curStatus = "销账中"
              }
              if(status == "02"){
                statusColor = "rgb(61,203,29)"
                curStatus = "销账成功"
              }
              if(status == "03"){
                statusColor = "rgb(109,109,109)"
                curStatus = "未销账"
              }
              if(status == "07"){
                statusColor = "rgb(109,109,109)"
                curStatus = "过期"
              }
              if(status == "1S"){
                statusColor = "rgb(109,109,109)"
                curStatus = "未开帐或已支付"
              }
              if(status == "99"){
                statusColor = "rgb(109,109,109)"
                curStatus = "已逾期"
              }
              // fft的billList里面会有barcode，但是其他的不一定会有
              barcode = barcode ? barcode : ""
              return (
                <li key = {index}>
                  <h1>{date}</h1>
                  <p>
                    <span className="price">{"¥ "+price}</span>
                    <span className="status" style = {{color:statusColor, paddingRight: status=="00" ? ".39rem":"0"}} onClick = { () => {handlePay(status, {price, date, barcode, billId, orgName:billInfo.data.org.name})}}>{curStatus}</span>
                    <img src={arrowRight} style={{display: status== "00" ? "block" : "none"}} />
                  </p>
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }else{
    return (
      <div className = "No-error">
        <img src={require("../img/billError.png")} />
        <p>您输入的缴费号有误，请重新输入缴费号码可以查询纸质账单</p>
      </div>
    )
  }

}


export default Bill
