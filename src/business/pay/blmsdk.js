import { paySuccess, payFail } from './index'

export const pay = payment => order => charge(order)

const charge = ({ id, orderType, url }) => {
  if(otosaas && otosaas.pay) {
    otosaas.payFinished = reply => {
      switch (reply) {
        case 'success': paySuccess(url); break;
        default: payFail(reply); break;
      }
    }
    otosaas.pay({ orderId: id, orderType })
  }
}
