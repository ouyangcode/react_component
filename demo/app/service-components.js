import React from 'react'
import { WhiteSpace, List } from 'antd-mobile'

import PromotionDemo, { PromotionDisplayDemo } from './d/promotion'
import { AddressSearchDemo } from './d/address-search'
import { ContactListDemo }   from './d/contact'
import CitySearchDemo   from './d/city-search'
import SearchDemo from './d/search/index'
import Empty from './d/empty'
import Supplier from './d/supplier'
import ListviewDemo from './d/listview'
import { ContactShowDemo } from './d/contact-show'
import { MyCalendarDemo } from './d/calendar'
import NewPromotionDemo from './d/new-promotion-demo.js'
import { TouristDemo } from './d/Tourist.js'
import { AddTouristDemo } from './d/addTourist.js'
import ActivePopupDemo from './d/activity-popup'
import { EvaluationDemo } from './d/evaluation'
import FocusDemo from './d/focusWrap'
import { PichandleDemo } from './d/picHandle'
import { BmapshowDemo } from './d/Bmapshow'
import { CardShowDemo } from './d/Cardshow'

const Service = () => (
  <div style={{ padding: '16px 0' }}>
    <List renderHeader={ () => '地址搜索' }>
      <AddressSearchDemo />
    </List>

    <List renderHeader={ () => '收货地址管理' }>
      <ContactListDemo />
    </List>
    <WhiteSpace size='lg' />
    <List>
      <ContactShowDemo />
    </List>
    <WhiteSpace size='lg' />
    <List>
      <TouristDemo />
    </List>
    <WhiteSpace size='lg' />
    <List>
      <AddTouristDemo />
    </List>
    <WhiteSpace size='lg' />
    <NewPromotionDemo />

    <WhiteSpace sie='lg' />
    <PromotionDemo />

    <WhiteSpace size='lg' />
    <ActivePopupDemo />


    <WhiteSpace size='lg' />
    <CitySearchDemo />

    <WhiteSpace size='lg' />
    <SearchDemo />

    <WhiteSpace size='lg' />
    <Empty />

    <WhiteSpace size='lg' />
    <Supplier />

    <WhiteSpace size='lg' />
    <ListviewDemo />

    <WhiteSpace size='lg' />
    <MyCalendarDemo />

    <WhiteSpace size='lg' />
    <EvaluationDemo />

    <WhiteSpace size='lg' />
    <FocusDemo />

    <WhiteSpace size='lg' />
    <PichandleDemo />

    <WhiteSpace size='lg' />
    <BmapshowDemo />

    <WhiteSpace size='lg' />
    <CardShowDemo />
  </div>
)





export default Service
