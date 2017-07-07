import './style/contact-show.scss'
import React, { Component } from 'react'

import ic_location from './img/ic_location.png'
import ic_gojiao from './img/ic_gojiao.png'
import ic_bgs from './img/ic_bgs.png'
import ic_add from './img/ic_add.png'

const ContactShow = ({ contact, handleSuccess }) => {
  const { name, city, cityId, contactId, county, countyId, detail, gender,
  latitude, longitude, phone, province, provinceId, tag, userId, houseNum } = contact
  console.log(!!contact)
  return (
    <div className = "addrWrap" onClick = {() => handleSuccess() }>
      <div>
        {
          contact ? (
            <div className = "addr_one">
            <div className = "addr_main">
            <div className = "addr_l">< img src = { ic_location } /></div>
            <div className = "addr_c">
              <div className = "addr_name kong">
                <span>{ name }</span><span>{ gender =='1'?'女' : '男' }</span><span>{ phone }</span>
                {
                  tag ? (<span className = "tag">{ tag }</span>):''
                }
              </div>
              <div className = "addr_city kong">
                <span>{ city }</span><span>{ county }</span>
              </div>
              <div className = "addr_detail">
                <span>{ detail }</span>
                { houseNum && <span className='houseNum'>{ houseNum }</span> }
              </div>
            </div>
            <div className = "addr_r"><img src = { ic_gojiao }/></div>
            <div className = "clear"></div>
            </div>
            </div>
          )
          : (
            <div className = "addr_no">
            <img src = { ic_add }/>
            <span>添加收货地址</span>
            <img src = { ic_gojiao } className = "goChoose"/>
            </div>
          )
        }
      </div>
      <div className = "addr_line" style={{ backgroundImage: `url(${ ic_bgs })` }}></div>
    </div>
  )
}


export default ContactShow
