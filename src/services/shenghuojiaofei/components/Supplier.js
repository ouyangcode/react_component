import React from "react"
import fft2 from '../img/fft2.png';
import "../styles/supplier.scss"
import { setServerUrl, getStore } from "@boluome/common-lib"
import userCenter from "../img/mycenter.png"

let baseurl = "http://boluome.test.otosaas.com";    //  测试用户列表路径


// 下面标签，放在supplier中，添加银联的数据源
// <h1 className={supplier=="chinapay" ? "active" : ""} onClick={() => handleSupplier("chinapay")}><img src={chinapay}></h1>

// 通过传入的showUser判断是否显示订单列表图标
const Supplier = ({supplier="fft", handleSupplier, showUser}) => {
  if(showUser){
    // const useId = "blm_test"     //本地
    const useId = getStore("customerUserId", "session")     //线上
    return (
      <div className="supplier">
        <p className="userCenter" onClick={ () => window.location.href = baseurl + '/shenghuojiaofei/list?customerUserId=' + useId }></p>
        <div className="box">
          <h1 className={supplier=="fft" ? "active" : ""}  style={{ background:`#fff url(${fft2}) no-repeat left center`, backgroundSize:'.34rem', backgroundPosition:'.34rem', paddingLeft:".72rem", width:"1.21rem" }} onClick={() => handleSupplier("fft")}>付费通</h1>
        </div>
      </div>
    )
  }else{
    return (
      <div className="supplier">
        <div className="box">
          <h1 className={supplier=="fft" ? "active" : ""}  style={{ background:`#fff url(${fft2}) no-repeat left center`, backgroundSize:'.34rem', backgroundPosition:'.34rem', paddingLeft:".72rem", width:"1.21rem" }} onClick={() => handleSupplier("fft")}>付费通</h1>
        </div>
      </div>
    )
  }
}
export default Supplier
