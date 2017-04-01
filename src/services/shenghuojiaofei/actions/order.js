import {browserHistory} from "react-router"
import {send, setStore} from "@boluome/common-lib"

import {Loading} from "@boluome/oto_saas_web_app_component"

export const changeOrder = (paras) => dispatch => {
  // console.log("orderData", data);
  const handleClose = Loading({maskClosable: false})
  send("/shenghuojiaofei/v1/order", paras[0], "POST", {"Content-Type" : "application/json"}).then(({code, data, message}) => {
    if(code === 0){
      // console.log(data)
      window.location.href = "http://boluome.test.otosaas.com/cashier/" + data.id
      // 将对应的orgs信息保存到本地中，便于后续使用
      setStore("defaultCategoryId",{"type":paras[1]})
    }else{
      console.log(message);
    }
    handleClose()
  }).catch(error => {
    handleClose()
    console.log(error.message)
  })
}

export const changeCurDiscData = (curDiscountData) => ({type:"CHANGE_DISCOUNT", curDiscountData})
