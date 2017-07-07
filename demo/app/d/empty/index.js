import './index.scss'
import React from 'react'
import { List, Icon, Toast, Modal } from 'antd-mobile'
import { getStore, setStore, get } from '@boluome/common-lib'
import { Empty, Mask, SlidePage } from '@boluome/oto_saas_web_app_component'

import img from './empty.png'


const Item = List.Item
const alert = Modal.alert;

const EmptyDemo = () => {


  return (
    <Item arrow='horizontal' onClick={ () =>
        Mask(
          <SlidePage target='right' showClose={ true }>
            <Empty
              imgUrl = { img }
              title = '我是 titile，不传我则不显示'
              message = '我是 message，我是必传参数'
              button = { <Button  /> }
              style = {{ zIndex: 10 }}
            />
          </SlidePage>
        , { mask: false, style: { position: 'absolute' } })
      } >
      返回为空
    </Item>
  )
}

export default EmptyDemo

const Button = ({ onClick }) => {
  return(
    <button onClick={ () => { console.log(123) } }>点我！！</button>
  )
}
