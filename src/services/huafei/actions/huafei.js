import { get, send, setServerUrl, setStore, getStore } from "@boluome/common-lib"
import { Loading } from "@boluome/oto_saas_web_app_component"

if(/^[\d]|localhost/.test(window.location.hostname)){
  setServerUrl("https://dev-api.otosaas.com")
}else{
  setServerUrl("/api")
}
// const [userId, userPhone] = ["blm_test", "13365653499"]	//dev环境
// const [ userId, userPhone ] = [ getStore("customerUserId", "session"), getStore("userPhone", "session") ]


// 定义一个函数用去除空格
const phoneTrim = (phone) => {
		const phone_REP =  /^(\d{3})[\s](\d{4})[\s](\d{4})$/;
		const matches = phone_REP.exec(phone);
		if(matches){
			const newNum = matches[1] + matches[2] + matches[3];
			return newNum;
		}else{
			return false;
		}
}

export const queryHuafeiList = (content) => dispatch => {
  // console.log('content', content.length);
  const sPhone = phoneTrim(content)
  dispatch({ type: "SET_CURPHONE", curPhone: content })  //将当前的输入框中内容合并到huafei分支中
  if(content.length == 13){
    const closeLoading = Loading({ mask:false, maskCloseable: false })  // 开启一个loading图
    get(`/huafei/v1/${sPhone}/prices`, { phone: sPhone }).then(({ code, data, message} ) => {
      if(code===0){
        data.number = content
        dispatch({ type:"SET_NUMBER_INFO", hfInfo:data }) //将当前选中的栏目信息合并到huafei分支中
        dispatch({ type:"SHOW_NOTICE", isNotice:"" }) //隐藏错误提示
        dispatch({ type:"SHOW_HISTORY", visibilityHistory:"" }) //隐藏历史记录
      }else {
        console.log(message);
        dispatch({ type:"SET_NUMBER_INFO", hfInfo:"" })
        dispatch({ type:"SHOW_NOTICE", isNotice:"true" })
      }
      closeLoading(); //关闭loading图
    }).catch(({ message }) => {
      dispatch({ type:"SET_NUMBER_INFO", hfInfo:'' })
      dispatch({ type:"SHOW_NOTICE", isNotice:"true" })
      closeLoading(); //关闭loading图
    })
  }else if(content.length==0){
    dispatch({ type:"SHOW_HISTORY", visibilityHistory:"" })
    dispatch({ type:"SET_NUMBER_INFO", hfInfo: "" })		//清除store中的hfInfo，使提交按钮和话费列表恢复初始情况
  }else{
    dispatch({ type:"SET_NUMBER_INFO", hfInfo: "" })		//清除store中的hfInfo，使提交按钮和话费列表恢复初始情况
  }
}


export const changeSubmit = (orderInfo) => {
  const userId    = getStore('customerUserId', 'session')
  const userPhone = getStore('userPhone', 'session')
  const paras = {
    "customerUserId": userId,
    "cardId": orderInfo.list.cardId,
    "phone": phoneTrim(orderInfo.number),
    "userPhone":userPhone,
    "realPrice": orderInfo.list.realPrice,
    "price": orderInfo.list.price,
    "isp": orderInfo.isp,
    "area": orderInfo.area
  }
  const closeLoading = Loading({ mask:false, maskCloseable: false })  // 开启一个loading图
  send("/huafei/v1/order", paras, "POST", { "Content-Type" : "application/json" }).then(({code, data, message}) => {
    if(code===0){
      // 话费下单成功后，保存号码到本地存储的历史记录中，并跳转到收银台
      let phoneHistorys = getStore("phoneHistory") ? getStore("phoneHistory").phoneHistorys : []
      phoneHistorys.filter(item => item != orderInfo.number)  //过滤掉当前历史中和当前号码相同的号码，再将当前号码插进去
      let exist = true;
      for(let i=0; i<phoneHistorys.length; i++){
        if(phoneHistorys[i] == orderInfo.number){
          exist = false
        }
      }
      exist && phoneHistorys.push(orderInfo.number)
      setStore('phoneHistory', { "phoneHistorys" : phoneHistorys })
      window.location.href = `/cashier/${ data.id }`				//dev环境
    }else{
      console.log(message);
    }
    closeLoading(); //关闭loading图
  }).catch(({message}) => {
    console.log(message)
    closeLoading(); //关闭loading图
  })
}
