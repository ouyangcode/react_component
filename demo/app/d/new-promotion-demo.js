import React from 'react'
import { NewPromotion } from '@boluome/oto_saas_web_app_component'

const NewPromotionDemo        = () => <NewPromotion orderType="waimai" channel="ele" amount={ 151 } handleChange={ (reply) => console.log(reply) }   />

export default NewPromotionDemo

const mockData = {
  activity: {
    "mutex": 1,
    "deductionPrice": 10,
    "subtitle": null,
    "id": "584a0b1f18d2462600e3e6bd",
    "title": "\u6ee125\u7acb\u51cf10\u5143"
  },
  coupon  : {
    "discount": 1,
    "deductionPrice": 12,
    "subtitle": "\u6ee125\u5143\u53ef\u7528",
    "title": "12\u5143\u5916\u5356\u4f18\u60e0\u5238",
    "threshold": 25,
    "mutex": 1,
    "ets": 1480608000.0,
    "type": 1,
    "id": "100000042926",
    "value": 12
  }
}
