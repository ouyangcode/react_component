import { send, merge, getStore } from '@boluome/common-lib'
import pingpp from 'pingpp-js'

export const pay = payment => order => charge(generateData(payment)(order))

const generateData = payment => order => {
  const { id, price, name, url } = order
  let payData = {
    id,
    amount : parseInt(price * 100),
    subject: name,
    body   : name,
    channel: payment
  }

  switch (payment) {
    case 'alipay_wap':
      return merge(payData, { extra: { success_url: `${ location.origin }/pay/success/${ id }` } })
    default:
      return payData
  }
}

const charge = data => {
  //用户token
  //用户id
  const Authorization = getStore('token', 'session') //'f225a9a9e46dd2b4602fd466adb7054e'
  const ID            = getStore('customerUserId', 'session')

  send('/payment/v1/charge', data, { Authorization, ID })
  .then(({ code, data, message }) => {
    if(code === 0) {
      createPayment(data)
    } else {
      alert(JSON.stringify(message.message))
      console.log(message)
    }
  })
}

const createPayment = charge =>
pingpp.createPayment(charge, (result, err) => {
    // alert(err.msg)
    if (result == "success") {
        // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的支付结果都会跳转到 extra 中对应的 URL。
    } else if (result == "fail") {
        // charge 不正确或者微信公众账号支付失败时会在此处返回
    } else if (result == "cancel") {
        // 微信公众账号支付取消支付
    }
})
