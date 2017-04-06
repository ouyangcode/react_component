import { parseSearch } from './url'
import { clone } from './func'
import { set } from './storage'
import { get } from './ajax'
// import { Toast } from '@boluome/common-lib'

import { Toast } from 'antd-mobile';
import { setStore } from "@boluome/common-lib"


const query = parseSearch()
//登陆
export const login = customerCode => {
  switch (customerCode) {
    case 'chubao': chubaoLogin();  break
    case 'mybosc': setTimeout(myboscLogin, 500);  break
    default: fetchUserInfo(query); break
  }
}
//登陆成功
const loginSuccess = ({ customerUserId, customerUserPhone, token }) => {
  customerUserId    && setStore('customerUserId', customerUserId, 'session')
  customerUserPhone && setStore('userPhone', customerUserPhone, 'session')
  token             && setStore('accessToken', token, 'session')
}

//获取用户信息
const fetchUserInfo = query => {
  get('/bindUser/v1', clone(query, { categoryCode: getCategoryCode() }))
  .then(({ code, data, message }) => {
    if(code === 0) { loginSuccess(data); }
    else {
      console.log("用户绑定失败：",message)
      // Toast.fail('用户绑定失败，请登录', 1);
    }
  })
}
//获取品类
const getCategoryCode = () => {
  const pathname = location.pathname.substring(1)
  const index    = pathname.indexOf('/')
  return index > 0 ? pathname.substr(0, index) : pathname
}
//上行登陆
const myboscLogin = () => {

  const { android, iOS } = window

  const success = device => {
    // alert(device.getTransferData('login_key'))
    const userInfo = JSON.parse(device.getTransferData('login_key'))
    const { userId, mobileNo } = userInfo
    const accessToken = device.getTransferData('accessToken')
    set('myboscToken', accessToken)
    fetchUserInfo({ userId, mobileNo, accessToken })
  }
  if(android && android.isLogin() === 'true') {
    success(android)
  } else if(iOS && iOS.isLogin()) {
    success(iOS)
  }
}
//触宝登陆
const chubaoLogin = () => {
  const call = accessToken => {
    set('ctkToken', accessToken)
    fetchUserInfo({ accessToken })
  }

  ctk.ready(() => {
    ctk.logged({
      yes: ({ accessToken }) => {
        call(accessToken)
      },
      no : res => {
        ctk.login({
          phone: '',
          success: ({ accessToken }) => {
            call(accessToken)
          },
          fail: res => {
            alert('登陆失败！！！')
          }
        })
      }
    })
  })
}
