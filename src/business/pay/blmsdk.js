import { paySuccess, payFail } from './index'
import { stringifyJSON } from '@boluome/common-lib'
export const pay = payment => order => charge(order)

const charge = ({ id, orderType, url }) => {
  if(window.otosaas && otosaas.pay) {
    otosaas.payFinished = reply => {
      switch (reply) {
        case 'success': paySuccess(url); break;
        default: payFail(reply); break;
      }
    }
    otosaas.pay(stringifyJSON({ orderId: id, orderType }))
  }
}
