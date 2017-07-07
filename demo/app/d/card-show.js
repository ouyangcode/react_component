import React from 'react'
import { List, WhiteSpace } from 'antd-mobile'
import { CardShow, Mask, SlidePage } from '@boluome/oto_saas_web_app_component'


const Item = List.Item
export const CardShowDemo = () => {
  const openCard = {
    nameTitle:      '上海欢乐科技园',
    startTime:      '10 : 00',
    durationTime:   '营业时间长8时30分',
    endTime:        '18 : 30',
    textArr:        ['开放时间', '结束时间', '日常成人票 ¥ 180','游玩时注意安全哦～', '景点地址：'],
    startDate:      '05月03日',
    endDate:        '05月03日',
    imgIcon:        '@',
    addressStr:     '上海市花园路128号2091',
    nodurationTime: '请联系商家',
  }
  const handleGoaddrMap = () => {
    alert('走，去地图～～')
  }
  return (
    <Item arrow='horizontal' onClick={ () =>
      Mask(
        <SlidePage target='right' type='root' >
          <CardShow openCard={ openCard } onChange={ handleGoaddrMap } />
        </SlidePage>
        , { mask: false, style: { position: 'absolute' } }
      )
    }>
      订单卡片展示
    </Item>
  )
}
