import {get, send, setServerUrl} from "@boluome/common-lib"
import { browserHistory } from 'react-router'
import { Loading } from '@boluome/oto_saas_web_app_component'    //引入loading图组件

if(/^[\d]|localhost/.test(window.location.hostname)){
  setServerUrl("https://dev-api.otosaas.com")
}else{
  setServerUrl("/api")
}

// setServerUrl("https://dev-api.otosaas.com")

// 城市改变时，获取当前的service
export const changeCity = ({ cityId, closeLoading }) => dispatch => {
  get("/shenghuojiaofei/v1/categories", {cityId:cityId, channel:"fft"}).then(({ code, data, message }) => {
    if(code === 0){
      console.log("初始化以后");
      dispatch({ type: "CHANGE_CITY_DATA", service: data })
      dispatch({type: 'CHANGE_CURRENT_ORG', currentOrg: [ "", {orgName: ''} ]})
      closeLoading()
    }else{
      console.log(message);
    }
  })
}

// 当服务改变时，获取当前的orgs
export const changeServer = ({cityId, categoryId, channel}) => dispatch => {
  // console.log("categoryId",categoryId)
  const getUrl = "/shenghuojiaofei/v1/"+ cityId +"/categorie/"+ categoryId +"/orgs"
  get(getUrl, {cityId:cityId, channel:channel, categoryId:categoryId}).then(({code,data,message}) => {
    if(code===0){
      // console.log("orgsData",data)
      dispatch({type:"CHANGE_SERVER_DATA", orgs:data, activeIndex:categoryId})
      dispatch({type: 'CHANGE_CURRENT_ORG', currentOrg:["", {orgId:""}]})
    }else{
      console.log(message);
    }
  })
}


export const queryBill = (paras) => dispatch => {
  const handleClose = Loading({ maskClosable: false })    //开启loading图
  send("/shenghuojiaofei/v1/bills", paras, "post").then((reply) => {
    // console.log(reply.data);
    dispatch({type : "QUERY_BILL", billInfo : reply})
    handleClose()   //关闭loading图
    browserHistory.push('/bill')
  })
}

export const changeOrg = currentOrg => {
  return {
    type: 'CHANGE_CURRENT_ORG',
    currentOrg
  }
}

// react-redux中，ajax请求是放在action中的，fetch返回的是一个Promise对象，返回的不是一个普通的对象不会被dispatch所识别
// 所以要使用双层dispatch，contaier中触发外层dispatch，接收fetch的data数据，执行actionCreator，在actionCreator中，在请求成功后，执行内层的dispatch，接收成功返回的数据，将这个发送给reducer，更新state
