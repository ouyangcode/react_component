'use strict'
import React from 'react';
import { List, Icon } from 'antd-mobile'
import { CitySearch, Mask, SlidePage } from '@boluome/oto_saas_web_app_component'
import { get, setStore, getStore } from '@boluome/common-lib'

const Item = List.Item

let cityArr = []
get('https://dev-api.otosaas.com/dianying/v1/cities').then(({ code, data, message }) => {
  cityArr = data
})

const CitySearchDemo = () => {
    return (
        <div className = 'demo-container'>
          <Item arrow='horizontal' onClick={ () =>
              Mask(
                <SlidePage target='right' showClose={ false } >
                  <CitySearch localCity="呵呵" categoryCode="shenghuojiaofei" showCancel={ true } handleCityData = { (result) => { console.log(result) }} api = { cityArr } handleClose={ () => console.log(111) } />
                </SlidePage>
              , { mask: false, style: { position: 'absolute' } })
            } >
              城市列表
            </Item>
        </div>
    )
}
export default CitySearchDemo;
