import { get, setStore } from '@boluome/common-lib'

//加载对方sdk
export const getCustomerConfig = (customerCode, callback) => {
  setStore('customerCode', customerCode, 'session')
  fetchConfig(err => {
    if(err) {
      callback(err)
    } else {
      loadSdk(customerCode, callback)
    }
  })
}
//获取用户配置
const fetchConfig = callback => {
  get('/basis/v1/main/info').then(({ code, data, message }) => {
    if(code == 0) {
      setStore('customerConfig', data, 'session')
      callback()
    } else {
      callback(message)
    }
  }).catch(err => {
    callback(err)
  })
}
const loadSdk = (customerCode, callback) => {
  switch (customerCode) {
    case 'chubao': chubaoSDK(callback); break
    case 'jst'   : jstSDK(callback);    break
    default      : callback();          break
  }
}

const isTest = location.host.indexOf('test') >= 0

const chubaoSDK = callback => {
  if(isTest) {
    appendJS('http://open.cootekservice.com/res/js/lib/ctk-1.0.0.js', callback)
  } else {
    appendJS('https://open.cootekservice.com/res/js/lib/ctks-1.0.0.js', callback)
  }
}

const jstSDK = callback => {
  appendJS('https://jst.otosaas.com/static/pay.js?c=10086')
  appendJS('https://jst.otosaas.com/static/payUtil.js')
  callback()
}

const appendJS = (src, callback) => {
  const script = document.createElement('script')
  script.src = src
  script.onload = () => callback()
  document.body.appendChild(script)
}
