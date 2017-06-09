

import React from 'react'
import { List, WhiteSpace } from 'antd-mobile'
import { AddTourist, Mask, SlidePage } from '@boluome/oto_saas_web_app_component'
import { get } from '@boluome/common-lib'


const Item = List.Item
// const listUrl = '/menpiao/v1/goods/'+'2973490'
// let pricearr = [];
//   get(listUrl, { channel : 'lvmama' })
//   .then(({ code, data, message }) => {
//       if(code === 0) {
//       pricearr = data.prices;console.log('prices-0-----',pricearr);
//       }
//   })
  // pricearr = { pricearr } onChange = { (res) =>  console.log('test_Calendar',res) }
export const AddTouristDemo = () => {
      return (
        <Item arrow='horizontal' onClick={ () =>
          Mask(
            <SlidePage target='right' type='root' >
              <AddTourist  onSuccess = { () => console.log('tianjiacehnggong')}/>
            </SlidePage>
            , { mask: false, style: { position: 'absolute' } }
          )
        }>
          编辑常用旅客
        </Item>
      )
}
