import React from 'react'
import { List, WhiteSpace } from 'antd-mobile'
import { MyCalendar, Mask, SlidePage } from '@boluome/oto_saas_web_app_component'
import { get } from '@boluome/common-lib'


const Item = List.Item
export const MyCalendarDemo = () => {
    const listUrl = '/menpiao/v1/goods/'+'622407'

      const handleSuccess = local => {
        alert('走吧，去收货列表页~');
      }
      return (
        <Item arrow='horizontal' onClick={ () =>
          Mask(
            <SlidePage target='right' type='root' >
              <MyCalendar pricearr = { pricearr } onChange = { (res) =>  console.log('test_Calendar',res) } CustomClick = 'true' DefaultnoUse = 'nouse' />
            </SlidePage>
            , { mask: false, style: { position: 'absolute' } }
          )
        }>
          选择日期
        </Item>
      )
}
let pricearr = [
  {
    aheadHour:-960,
    date:"2017-06-14",
    marketPrice:30,
    sellPrice:25,
    stock:-1,
  },
  {
    aheadHour:-960,
    date:"2017-06-15",
    marketPrice:30,
    sellPrice:25,
    stock:-1,
  },
  {
    aheadHour:-960,
    date:"2017-06-16",
    marketPrice:30,
    sellPrice:25,
    stock:-1,
  },
  {
    aheadHour:-960,
    date:"2017-06-17",
    marketPrice:30,
    sellPrice:25,
    stock:-1,
  },
  {
    aheadHour:-960,
    date:"2017-06-19",
    marketPrice:30,
    sellPrice:25,
    stock:-1,
  },
  {
    aheadHour:-960,
    date:"2017-06-20",
    marketPrice:30,
    sellPrice:25,
    stock:-1,
  },
  {
    aheadHour:-960,
    date:"2017-06-23",
    marketPrice:30,
    sellPrice:25,
    stock:-1,
  },
  {
    aheadHour:-960,
    date:"2017-07-02",
    marketPrice:30,
    sellPrice:25,
    stock:-1,
  },
  {
    aheadHour:-960,
    date:"2017-07-03",
    marketPrice:30,
    sellPrice:25,
    stock:-1,
  },
  {
    aheadHour:-960,
    date:"2017-07-04",
    marketPrice:30,
    sellPrice:25,
    stock:-1,
  },
  {
    aheadHour:-960,
    date:"2017-07-06",
    marketPrice:30,
    sellPrice:25,
    stock:-1,
  },
  {
    aheadHour:-960,
    date:"2017-07-07",
    marketPrice:30,
    sellPrice:25,
    stock:-1,
  },
  {
    aheadHour:-960,
    date:"2017-07-08",
    marketPrice:30,
    sellPrice:25,
    stock:-1,
  },
  {
    aheadHour:-960,
    date:"2017-07-10",
    marketPrice:30,
    sellPrice:25,
    stock:-1,
  },
  {
    aheadHour:-960,
    date:"2017-08-03",
    marketPrice:30,
    sellPrice:25,
    stock:-1,
  },
  {
    aheadHour:-960,
    date:"2017-08-04",
    marketPrice:30,
    sellPrice:25,
    stock:-1,
  },
  {
    aheadHour:-960,
    date:"2017-08-06",
    marketPrice:30,
    sellPrice:25,
    stock:-1,
  },
  {
    aheadHour:-960,
    date:"2017-08-07",
    marketPrice:30,
    sellPrice:25,
    stock:-1,
  },
  {
    aheadHour:-960,
    date:"2017-08-08",
    marketPrice:30,
    sellPrice:25,
    stock:-1,
  },
  {
    aheadHour:-960,
    date:"2017-08-10",
    marketPrice:30,
    sellPrice:25,
    stock:-1,
  },
];
