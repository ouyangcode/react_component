import React from 'react'
import { List, WhiteSpace } from 'antd-mobile'
import { PicHandle, Mask, SlidePage } from '@boluome/oto_saas_web_app_component'
import { get } from '@boluome/common-lib'

// http://img5.imgtn.bdimg.com/it/u=3181098452,2301512005&fm=23&gp=0.jpg
const Item = List.Item
export const PicHandleDemo = () => {
  const sw = '400'
  const sh = '420'
  const picSrc = 'http://pic.qiantucdn.com/58pic/11/31/58/97p58PICV26.jpg'
  // const picSrc = 'http://img5.imgtn.bdimg.com/it/u=3181098452,2301512005&fm=23&gp=0.jpg'
      return (
        <Item arrow='horizontal' onClick={ () =>
          Mask(
            <SlidePage target='right' type='root' >
              <PicHandle picSrc = { picSrc } sw = { sw } sh = { sh } />
            </SlidePage>
            , { mask: false, style: { position: 'absolute' } }
          )
        }>
          图片处理
        </Item>
      )
}
