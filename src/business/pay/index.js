import { merge, getStore, stringifyQuery }   from '@boluome/common-lib'

import { Toast } from 'antd-mobile'

import * as pingpp   from './pingpp'
import * as allinpay from './allinpay'
import * as chubao   from './chubao'
import * as jst      from './jst'
import * as mybosc   from './mybosc'
import * as ala      from './ala'
import * as blmsdk   from './blmsdk'

export const pay = ({ code, handler }) => order =>
merge({},
  { pingpp, allinpay, chubao, jst, mybosc, ala, blmsdk }
)[handler].pay(code)(order)

export const paySuccess = url => {
  Toast('success', '支付成功')
  const customerUserId = getStore('customerUserId', 'session')
  setTimeout(() => {
    location.href = `${ url }${ stringifyQuery({ customerUserId }) }`
  }, 3000)
}

export const payFail = (word = '支付失败') => {
  Toast('error', word)
}
