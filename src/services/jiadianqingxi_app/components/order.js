// 样式引入
import '../style/order.scss'

import React from 'react'
import { setStore} from '@boluome/common-lib';
import { Mask, SlidePage, ContactList } from '@boluome/oto_saas_web_app_component'



const order = (props) => {console.log('props==========',props)
   const { children, handleChangeContact, contact } = props;
   const { detailsData = {} } = props;console.log('ssss==='+detailsData)
   let introductions = detailsData.introduction;console.log('introductions----' +detailsData.introduction)
   let notes = detailsData.note;
   if(!introductions){
      introductions = []
   }
   if(!notes){
      notes =[]
   }
   return (
      <div className = "orderWrap">
          <div className = "addrWrap" onClick = {() =>
              Mask(
                  <SlidePage target='right' type='root' >
                    <ContactList contact={ contact } handleChange={ contact => handleChangeContact(contact) }/>
                  </SlidePage>
                  , { mask: false, style: { position: 'absolute' } }
              )
          }>
              <div className = "addr_no">
                  <img src = { require('../img/ic_add.png') }/>
                  <span>添加收货地址</span>
                  <img src = { require('../img/gojiao.png') } className = "goChoose"/>
              </div>
              <div className = "addr_one">
                  <div className = "addr_main">
                      <div className = "addr_l">< img src = {require('../img/ding.png')} /></div>
                      <div className = "addr_c">
                          <div className = "addr_name kong">
                              <span>张三</span><span>女士</span><span>18321478733</span><span>家</span>
                          </div>
                          <div className = "addr_city kong">
                              <span>上海市虹口区</span>
                          </div>
                          <div className = "addr_detail kong">
                              <span>花园路</span><span>128号</span><span>运动loft园区</span>
                          </div>
                      </div>
                      <div className = "addr_r"><img src = {require('../img/gojiao.png')}/></div>
                  </div>
              </div>
              <div className = "addr_line"></div>
          </div>
      </div>
   )
}


// Create a product list


export default order
