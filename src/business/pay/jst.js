import { get, send }  from '@boluome/common-lib'
import { paySuccess, payFail } from './index'

export const pay = payment => order => createPayment(order)

const createPayment = ({ id, url }) => {
  const { zhifu } = window

  const feedback = reply => {
    if(reply === 'success') {
      paySuccess(url)
    } else {
      payFail()
    }
  }

  zhifu && zhifu(id, feedback)
}
