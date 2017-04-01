import { get } from '@boluome/common-lib'

export const pay = payment => order => charge(order)

const charge = ({ id, orderType }) => {
  get('/payment/v1', { orderId: id, orderType })
  .then(({ code, data, message }) => {
      if(code === 0) {
        createPayment(data)
      } else {
        alert(JSON.stringify(message))
        console.log(message)
      }
  })
}

const createPayment = ({ paymentUrl }) => {
  location.href = paymentUrl
}
