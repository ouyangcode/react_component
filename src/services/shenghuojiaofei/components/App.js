import '../styles/index.scss'

import React from 'react'

import { List, WhiteSpace, NoticeBar, InputItem, Button, Toast, WingBlank } from 'antd-mobile'
import {get, setServerUrl} from '@boluome/common-lib'
import Service   from './Ser'
import OrgPicker from './OrgPicker'
import Supplier from "./Supplier.js"
import InputHasValue from "./InputHasValue"
import chinapay from '../img/chinapay.png';

const ListItem = List.Item

let inputNode

const Home = ({ selectedServer = '', orgs = [{orgId: ''}], billNo, billPwd, currentOrg = ["", {orgId:""}], service, defaultCategoryId,
                handleDeliveryTimeChange, handleSelectServer,
                handleBilling, handleBillClick, handleInputChange, handlePwdChange,
                handleSupplier, supplier , activeIndex}) => {
  // 当页面加载，或服务改变时，currentorg中没有数据，这时使用orgs中的第一个数据为默认数据
  currentOrg[1] = currentOrg[1].orgId ? currentOrg[1]: orgs[0]
  // 定义当前选中组织的混合唯一id（组织id+类型），名称，提醒,------使用了一个判断，避免了页面刷新初始化时，orgs数据还没有生成就使用里面数据会报错的情况
  const currentOrgId = currentOrg[1].orgId ? currentOrg[1].orgId+currentOrg[1].type : ""
  const currentOrgTypeName = currentOrg[1].orgId ? currentOrg[1].typeName : ""
  const currentOrgRemark = currentOrg[1].orgId ? currentOrg[1].remark : ""
  const currentOrgNeedPwd = currentOrg[1].orgId ? currentOrg[1].needPwd : ""
  billPwd = billPwd ? billPwd : ""


  return  (
    <div className="my-app">
      <Supplier supplier={supplier} handleSupplier={handleSupplier} showUser={true} />
      <Service handleSelectServer={handleSelectServer} defaultCategoryId={defaultCategoryId} services={ service } activeIndex={activeIndex} />
      <NoticeBar mode="closable" icon={null}>目前只支持上海地区</NoticeBar>
      <List className="service-list">
        <ListItem onClick={() => {}}>所在城市：上海市</ListItem>
        <OrgPicker { ...{ currentOrg, orgs, handleDeliveryTimeChange } } />
        <InputHasValue billNo={billNo} currentOrgNeedPwd={currentOrgNeedPwd} currentOrgTypeName={currentOrgTypeName} handleInputChange={handleInputChange} handlePwdChange={handlePwdChange} />
      </List>
      <p style={{fontSize:".2rem", lineHeight:".3rem", color:"red", textAlign:"center" }}>{currentOrgRemark}</p>
      <Button className="btn service-query" type="primary" onClick = { () => handleBillClick(billNo, billPwd, currentOrgNeedPwd, orgs.filter(item => item.orgId+item.type === currentOrgId)) }>查询账单</Button>
    </div>
  )
}
export default Home
