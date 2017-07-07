import React from 'react'
import { NoticeBar, Icon } from 'antd-mobile'

const NoticeBarBLM = ({ text = '服务商维护如遇无法充值，请稍后再试' }) => (
  <NoticeBar style={{ background: '#fffad8' }} icon={ <Icon type={ require('./notice.svg') } size='md' /> } marqueeProps={{ style: { color: '#333333', marginLeft: '.19rem' } }}>{ text }</NoticeBar>
)

export default NoticeBarBLM
