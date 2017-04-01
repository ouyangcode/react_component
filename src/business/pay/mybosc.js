import { get, send, getStore }  from '@boluome/common-lib'
import { paySuccess, payFail } from './index'

export const pay = payment => order => charge(order)

const charge = ({ id, url }) => {
  get('/payment/v1', { orderId: id, tokenId: getStore('myboscToken', 'session') })
  .then(({ code, data, message }) => {
    if(code === 0) {
      createPayment(data, url)
    } else {
      alert(message)
    }
  }).catch(err => {
    console.log(err)
  })
}

const createPayment = (data, url) => {

  const form = document.getElementById('boscForm')

  form.action   =  'https://203.156.238.218:8777/boscartoon/eCardPay.action'
  if(location.host.indexOf('test') < 0) {
    form.action = 'https://epay.bankofshanghai.com/boscartoon/eCardPay.action'
  }
  document.getElementsByName('signData')[0].value        = data.signData
  document.getElementsByName('curType')[0].value         = data.curType
  document.getElementsByName('tokenId')[0].value         = data.tokenId
  document.getElementsByName('merOrderAmt')[0].value     = data.merOrderAmt
  document.getElementsByName('koalB64Cert')[0].value     = data.koalB64Cert
  document.getElementsByName('merOrderNum')[0].value     = data.merOrderNum
  document.getElementsByName('userId')[0].value          = data.userId
  document.getElementsByName('shortcutMerCode')[0].value = data.shortcutMerCode
  document.getElementsByName('shortcutMerName')[0].value = data.shortcutMerName
  document.getElementsByName('merNotifyUrl')[0].value    = data.merNotifyUrl
  document.getElementsByName('orderTime')[0].value       = data.orderTime
  document.getElementsByName('merchantID')[0].value      = data.merchantID
  document.getElementsByName('digest')[0].value          = data.digest
  document.getElementsByName('merGetGoodsUrl')[0].value  = data.merGetGoodsUrl
  document.getElementsByName('describe')[0].value        = data.describe
  document.getElementsByName('orderDate')[0].value       = data.orderDate

  form.submit()

}
