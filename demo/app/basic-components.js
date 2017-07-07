import React from 'react'
import { ModalMask, ModalMaskWithoutMask, ModalMaskCantBeCloseByMask } from './d/mask'
import { NormalLoading, LoadingWithoutMask, LoadingCustomize } from './d/loading'
import { NormalSlidePage, SlideDownPage, SlideLeftPage, SlideUpPage, SlidePageNoClose, SlidePageWithCustomizeClose } from './d/slide-page'
import { List } from 'antd-mobile'
const Item = List.Item

const Basic = () => (
  <div style={{ padding: '16px 0', boxSizing: 'border-box' }}>
    <List renderHeader={ () => 'Mask' }>
      <ModalMask />
      <ModalMaskWithoutMask />
      <ModalMaskCantBeCloseByMask />
    </List>
    <List renderHeader={ () => 'Loading' }>
      <NormalLoading />
      <LoadingWithoutMask />
      <LoadingCustomize />
    </List>
    <List renderHeader={ () => 'SlidePage' }>
      <NormalSlidePage />
      <SlideDownPage />
      <SlideLeftPage />
      <SlideUpPage />
      <SlidePageNoClose />
      <SlidePageWithCustomizeClose />
    </List>
  </div>
)

export default Basic
