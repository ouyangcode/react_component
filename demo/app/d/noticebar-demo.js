import React from 'react'
import { List } from 'antd-mobile'
import { NoticeBar } from '@boluome/oto_saas_web_app_component'

const NoticeBarDemo = () => (
  <List.Item  arrow='horizontal' onClick={ () =>
    Mask(
      <SlidePage target='right' showClose={ true }>
        <NoticeBar />
      </SlidePage>
    , { mask: false, style: { position: 'absolute' } })
  }>

  </List.Item>
)

export default NoticeBarDemo
