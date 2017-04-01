import { get, getStore } from '@boluome/common-lib'
import { paySuccess, payFail } from './index'

export const pay = payment => order => select(order)

const select = (order) => {
  const { price, orderType } = order
  const { ctk } = window
  if(ctk && ctk.select) {
    ctk.select({
      tradeService: `com.boluome.${ orderType }`,
      totalFee: parseInt(price * 100),
      success : ({ tradeStr }) => {
        charge(tradeStr, order)
        ctk.show()
      },
      fail: res => {
        console.log(res)
        alert('pay error')
      }
    })
  }
}

const charge = (tradeStr, { id, url }) => {
  const ctkToken = setStore('ctkToken', 'session') || ''
  get('/payment/v1', { orderId: id, accessToken: ctkToken, tradeStr })
  .then(({ code, data, message }) => {
      if(code === 0) {
        createPayment(data, url)
      } else {
        alert(JSON.stringify(message))
        console.log(message)
      }
  })
}

const createPayment = ({ payStr }, url) => {
  ctk.pay({
    payStr,
    finish: resCode => {
      ctk.dismiss()
      switch (resCode) {
        case 4102: paySuccess(url); break
        case 4106:
        case 4104:
        case 4108: payFail(); break
        default: break
      }
    }
  })
}
