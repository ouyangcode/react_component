import React from 'react'
import { List, WhiteSpace } from 'antd-mobile'
import { MyCalendar, Mask, SlidePage } from '@boluome/oto_saas_web_app_component'
import { get } from '@boluome/common-lib'


const Item = List.Item
export const MyCalendarDemo = () => {
    const listUrl = '/menpiao/v1/goods/'+'622407'
    let pricearr = [];
      // get(listUrl, { channel : 'lvmama' })
      // .then(({ code, data, message }) => {
      //     if(code === 0) {
      //     pricearr = data.prices;console.log('prices-0-----',pricearr);
      //     }
      // })

      const handleSuccess = local => {
        alert('走吧，去收货列表页~');
      }
      return (
        <Item arrow='horizontal' onClick={ () =>
          Mask(
            <SlidePage target='right' type='root' >
              <MyCalendar pricearr = { pricearr } onChange = { (res) =>  console.log('test_Calendar',res) }/>
            </SlidePage>
            , { mask: false, style: { position: 'absolute' } }
          )
        }>
          选择日期
        </Item>
      )
}
