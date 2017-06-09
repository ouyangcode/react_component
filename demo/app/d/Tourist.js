

import React from 'react'
import { List, WhiteSpace } from 'antd-mobile'
import { Tourist, Mask, SlidePage } from '@boluome/oto_saas_web_app_component'
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
export const TouristDemo = () => {
      return (
        <Item arrow='horizontal' onClick={ () =>
          Mask(
            <SlidePage target='right' type='root' >
              <Tourist  handleChange={ contact => console.log(contact) }/>
            </SlidePage>
            , { mask: false, style: { position: 'absolute' } }
          )
        }>
          新增常用旅客
        </Item>
      )
}
