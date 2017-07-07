import React from 'react'
import { List, WhiteSpace } from 'antd-mobile'
import { MapShow, Mask, SlidePage } from '@boluome/oto_saas_web_app_component'


const Item = List.Item
export const MapShowDemo = () => {
  const addrTitlename = '东方明珠核桃万分'
  const addrnameStr = '上海市浦东新区世纪大道1号核桃仁和热万分'
  const longitude = '121.498556556'
  const latitude = '31.239923392'
  return (
    <Item arrow='horizontal' onClick={ () =>
      Mask(
        <SlidePage target='right' type='root' >
          <MapShow
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
