import React from 'react'
import { List, WhiteSpace } from 'antd-mobile'
import { Bmapshow, Mask, SlidePage } from '@boluome/oto_saas_web_app_component'


const Item = List.Item
export const BmapshowDemo = () => {
  const addrTitlename = '上海东林寺'
  const addrnameStr = '上海市金山区朱泾镇东林街150号'
  const longitude = '121.165817873'
  const latitude = '30.8942060743'
  return (
    <Item arrow='horizontal' onClick={ () =>
      Mask(
        <SlidePage target='right' type='root' >
          <Bmapshow
            addrTitlename={ addrTitlename }
            addrnameStr={ addrnameStr }
            latitude={ latitude }
            longitude={ longitude }
          />
        </SlidePage>
        , { mask: false, style: { position: 'absolute' } }
      )
    }>
      地图展示
    </Item>
  )
}
