import React from 'react'
import { List } from 'antd-mobile'
import { Mask } from '@boluome/oto_saas_web_app_component'

const Item = List.Item

export const ModalMask = () => (
  <Item arrow='horizontal' onClick={ () => Mask(<Outter />) }>普通遮罩层</Item>
)

export const ModalMaskWithoutMask  = () => (
  <Item arrow='horizontal' onClick={ () => Mask(<Outter />, { mask: false }) }>透明的遮罩层</Item>
)

export const ModalMaskCantBeCloseByMask  = () => (
  <Item arrow='horizontal' onClick={ () => Mask(<Outter />, { maskClosable: false }) }>不能点击遮罩关闭遮罩层</Item>
)


//🌰

const innerStyle = {
  width: '50%',
  height: '50%',
  backgroundColor: '#fff',
  position: 'absolute',
  left: '25%',
  top: '25%',
  padding: '16px',
  border: '1px solid #ccc',
  zIndex: 9
}

const Outter = ({ handleContainerClose }) => (
  <div onClick={ handleContainerClose } style={ innerStyle }>
    点我关闭
  </div>
)


const Inner = ({ handleContainerClose }) => {
  return (<div onClick={ handleContainerClose } style={ innerStyle }>Inner</div>)
}
