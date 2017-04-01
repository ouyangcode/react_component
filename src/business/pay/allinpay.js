import { get } from '@boluome/common-lib'
import { paySuccess } from './index'


export const pay = payment => order => charge(order)

const charge = ({ id, url }) => {
  get('/payment/v1', { orderId: id })
  .then(({ code, data, message }) => {
      if(code === 0) {
        createPayment(data, url)
      } else {
        alert(JSON.stringify(message))
        console.log(message)
      }
  })
}

const createPayment = ({ sysid, timestamp, v, req, sign }, url) => {
  const { allinpaywallet } = window
  if(allinpaywallet && allinpaywallet.awPay) {
    allinpaywallet.awPay(sysid, timestamp, v, req, sign)
    window.awPayFinish = (sysid, timestamp, v, rps, sign) => {
      paySuccess(url)
    }
  } else {
    alert('没有 allinpaywallet 对象')
  }
}
