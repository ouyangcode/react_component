import React from 'react'
import { List, Icon } from 'antd-mobile'
import { Loading } from '@boluome/oto_saas_web_app_component'

const Item = List.Item

export const NormalLoading = () => (
  <Item arrow='horizontal'
  onClick={
    () => {
        const handleClose = Loading({ maskClosable: false })
        setTimeout(handleClose, 1000)
    }
  }>Loading</Item>
)

export const LoadingWithoutMask = () => (
  <Item arrow='horizontal'
  onClick={
    () => {
        const handleClose = Loading({ maskClosable: false, mask: false })
        setTimeout(handleClose, 1000)
    }
  }>Loading，不带遮罩</Item>
)

export const LoadingCustomize = () => (
  <Item arrow='horizontal'
  onClick={
    () => {
        const handleClose = Loading({
                                      component: <Icon type='loading' />,
                                      maskClosable: false,
                                      mask: true,
                                      style: { color: '#fff' } 
                                    })
        setTimeout(handleClose, 1000)
    }
  }>自定义Loading</Item>
)
