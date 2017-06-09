import React from 'react'
import { List, WhiteSpace } from 'antd-mobile'
import { ContactShow, Mask, SlidePage } from '@boluome/oto_saas_web_app_component'

const Item = List.Item

export const ContactShowDemo = () => {
    // const contact = ''
    const contact = markcontact
    const handleSuccess = local => {
      alert('走吧，去收货列表页~');
    }
      return (
        <Item arrow='horizontal' onClick={ () =>
          Mask(
            <SlidePage target='right' type='root' >
              <ContactShow { ...{ contact ,handleSuccess } }/>
            </SlidePage>
            , { mask: false, style: { position: 'absolute' } }
          )
        }>
          收货地址展示
        </Item>
      )
}

const markcontact = {
     name:'张三',
     city: '上海市',
     cityId: '310000',
     contactId: '1493085604784',
     county: '黄浦区',
     countyId: '310101',
     detail: '内环中环之间复兴东路789号',
     gender: '0',
     latitude: '31.227203',
     longitude: '121.496072',
     phone: '18326473287',
     province: '上海市',
     provinceId: '310000',
     tag: '公司',
     userId: 'blm_test'
}
