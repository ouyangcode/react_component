import { setStore, getStore, get, merge, parseQuery, parseJSON } from '@boluome/common-lib'
//获取query
const query = parseQuery(location.search)

let loginSuccessCallback
//登陆
export const login = (callback) => {
  console.log('customerCode', getStore('customerCode', 'session'))
  loginSuccessCallback = callback
  switch (getStore('customerCode', 'session')) {
    case 'chubao': chubaoLogin();  break
    case 'mybosc': myboscLogin();  break
    case 'blmsdk': sdkLogin();     break
    default: fetchUserInfo(query); break
  }
}
//登陆成功
const loginSuccess = ({ customerUserId, customerUserPhone, token }) => {
  customerUserId    && setStore('customerUserId', customerUserId, 'session')
  customerUserPhone && setStore('userPhone', customerUserPhone, 'session')
  token             && setStore('accessToken', token, 'session')
  loginSuccessCallback(null, { customerUserId, userPhone: customerUserPhone, token })
}
//获取用户信息
const fetchUserInfo = query => {
  console.log(query)
  get('/bindUser/v1', merge(query, { categoryCode: getCategoryCode() }))
  .then(({ code, data, message }) => {
    if(code === 0) { loginSuccess(data) }
    else { console.log(message) }
  }).catch((err) => loginSuccessCallback(err))
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
    const userInfo = parseJSON(device.getTransferData('login_key'))
    const { userId, mobileNo } = userInfo
    const accessToken = device.getTransferData('accessToken')
    set('myboscToken', accessToken)
    fetchUserInfo({ userId, mobileNo, accessToken })
  }
  if(android && android.isLogin() === 'true') {
    success(android)
  } else if(iOS && iOS.isLogin()) {
    success(iOS)
  } else {
    loginSuccessCallback('没有绑定成功')
  }
}
//触宝登陆
const chubaoLogin = () => {
  const call = accessToken => {
    setStore('ctkToken', accessToken, 'session')
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
            loginSuccessCallback('登陆失败')
          }
        })
      }
    })
  })
}
//sdk登陆
const sdkLogin = () => {
  const { otosaas } = window
  if(typeof otosaas !== 'undefined') {
    otosaas.loginSuccess = (appKey, sign, customerUserId, customerUserPhone, timestamp) => {
      fetchUserInfo({ appKey, sign, customerUserId, customerUserPhone, timestamp })
    }
    otosaas.login()
  }
}
