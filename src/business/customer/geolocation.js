import { setStore, getStore, merge }  from '@boluome/common-lib'
import { isTest } from './index'

let getLocationCallback

export const getLocation = (callback) => {

  getLocationCallback = callback

  switch (getStore('customerCode', 'session')) {
    case 'allinpay': allinpayLocation(); break
    case 'chubao'  : chubaoLocation();   break
    case 'mybosc'  : setTimeout(boscLocation, 500); break  //由于上行的注入时机问题、延迟加载
    case 'blmsdk'  : sdkLocation();      break
    case 'abchina' : queryLocation();    break
    default: baiduLocation(); break
  }
}
//通过URL参数来获取坐标
const queryLocation = () => {
  const { latitude, longitude } = parseSearch(location.search)
  processingPoint({ latitude, longitude })
}
//通联获取坐标
const allinpayLocation = () => {
  const { allinpaywallet } = window
  if(allinpaywallet && allinpaywallet.awLatAndLng && !isTest()) {
    const { lat, lng } = JSON.parse(allinpaywallet.awLatAndLng())
    processingPoint({ latitude: lat, longitude: lng })
  } else {
    baiduLocation()
  }
}
//上行获取坐标
const boscLocation = () => {
  const { android, iOS, notifyKey = 'boscLocSuccess' } = window
  window.notifyJSEvent = (key, params) => {
    if(key === notifyKey) {
      const { latitude, longitude } = JSON.parse(params)
      processingPoint({ latitude, longitude })
    }
  }
  //判断环境 并调用requestLocation
  if(android && 'true' === android.isLogin()) {
    android.requestLocation(notifyKey)
  } else if(iOS && iOS.isLogin()) {
    iOS.requestLocation(notifyKey)
  } else {
    baiduLocation()
  }
}
//百度获取坐标需更新
const baiduLocation = () => {
  new BMap.Geolocation()
  .getCurrentPosition((reply) => {
    const { lat, lng } = reply.point
    processingPoint({ latitude: lat, longitude: lng })
  })
}
//SDK获取坐标
const sdkLocation = () => {
  const { otosaas } = window
  if(typeof otosaas !== 'undefined') {
    otosaas.receiveLocation = (longitude, latitude) => {
      processingPoint({ latitude, longitude })
    }
    otosaas.requestLocation()
  }
}
//触宝获取坐标
const chubaoLocation = () => {
  const { ctk } = window
  if(ctk) {
    ctk.ready(() => {
      ctk.getLocation({
        success: ({ latitude, longitude }) => {
          processingPoint({ latitude, longitude })
        }
      })
    })
  }
  else {
    baiduLocation()
  }
}
//处理坐标
const processingPoint = point => {
  if(!(point.latitude && point.longitude)) {
    console.log('获取浏览器坐标')
    baiduLocation()
  } else {
    setStore('geopoint', point, 'session')
    getCurrentPosition(point)
  }
}
//根据坐标通过百度SDK获取当前地址
const getCurrentPosition = point => {
  const BPoint = new BMap.Point(point.longitude, point.latitude)
  const BCoder = new BMap.Geocoder()
  BCoder.getLocation(BPoint, ({ address, addressComponents }) => {
    setStore('currentAddress' , address, 'session')
    setStore('currentPosition', addressComponents, 'session')
    getLocationCallback && getLocationCallback()
  })
}
