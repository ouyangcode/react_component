import React from 'react'
import { ActivePopup } from '@boluome/oto_saas_web_app_component'
import { List } from 'antd-mobile'

const ActivePopupDemo = () => (
  <List.Item extra={ <ActivePopup orderType='huafei' defaultShow={ false } channel='ofpay' amount={ 1000 } popupStyle={{ top: '-1.15rem' }} handlePromotionChange={ (e) => console.log(e) } /> }>
    优惠展示图标
  </List.Item>
)

export default ActivePopupDemo
