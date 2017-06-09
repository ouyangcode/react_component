import React from 'react'
import { List } from 'antd-mobile'
import { ContactList, Mask, SlidePage } from '@boluome/oto_saas_web_app_component'

const Item = List.Item

export const ContactListDemo = () => {

  return (
    <Item arrow='horizontal' onClick={ () =>
      Mask(
        <SlidePage target='right' type='root' >
          <ContactList handleChange={ contact => console.log(contact) }/>
        </SlidePage>
        , { mask: false, style: { position: 'absolute' } }
      )
    }>
      收货地址管理
    </Item>
  )
}
