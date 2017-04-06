import React from 'react'
import { List, Icon } from 'antd-mobile'
import { Mask, SlidePage } from '@boluome/oto_saas_web_app_component'

const Item = List.Item

export const NormalSlidePage = () => (
  <Item arrow='horizontal' onClick={ () => Mask(<SlidePage target='right' />, { mask: false }) }>滑出层，由右划入</Item>
)

export const SlideDownPage = () => (
  <Item arrow='horizontal' onClick={ () => Mask(<SlidePage target='down' />, { mask: false }) }>滑出层，由下划入</Item>
)

export const SlideLeftPage = () => (
  <Item arrow='horizontal' onClick={ () => Mask(<SlidePage target='left' />, { mask: false }) }>滑出层，由左划入</Item>
)

export const SlideUpPage = () => (
  <Item arrow='horizontal' onClick={ () => Mask(<SlidePage target='up' />, { mask: false }) }>滑出层，由上划入</Item>
)

export const SlidePageNoClose = () => (
  <Item arrow='horizontal' onClick={ () => Mask(<SlidePage target='right' showClose={ false } ><CloseDemo /></SlidePage>, { mask: false }) }>子组件实现关闭</Item>
)

export const SlidePageWithCustomizeClose = () => (
  <Item arrow='horizontal' onClick={ () => Mask(<SlidePage target='right' closeComponent={ <CustomizeCloseBtn /> } />, { mask: false }) }>自定义关闭按钮</Item>
)

const CustomizeCloseBtn = (props) => (
  <div style={{ color: 'blue', position: 'absolute', top: '20px', right: '20px', fontSize: '.30rem' }} >
    关了个闭
  </div>
)

const CloseDemo = ({ handleContainerClose }) => (
  <div style={{ width : '200px',
                height: '200px',
                border: '1px solid #ccc',
                top : '50%',
                left: '50%',
                margin: '-100px',
                position  : 'relative',
                textAlign : 'center',
                lineHeight: '200px'
              }} onClick={ handleContainerClose }>
    点我关闭
  </div>
)
