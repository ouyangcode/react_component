import "../styles/index.scss"
import React from 'react'

import { List, Picker } from 'antd-mobile'


const ListItem = List.Item

// 创建配送时间选择的组件
const OrgPicker = ({currentOrg, orgs = [{orgName : ""}], handleDeliveryTimeChange }) => {
  const newOrgs = orgs.map((item, index) => {return { value: [item.orgId+item.type, item], label: item.orgName}})
  // data中应一个数组，[{value:data, label:data}],其中value作用有两个，当作唯一key和选中一个标签时，将该标签对应的value值以数组的形式，会传给回调函数作为形参，label是下方显示的数据
  return (
    <List className="pick-list">
      <Picker extra={ currentOrg[1].orgId ? currentOrg[1].orgName : newOrgs[0].label }
              data={ newOrgs } onChange={ handleDeliveryTimeChange } cols='1'>
        <ListItem arrow='down' >出账机构：</ListItem>
      </Picker>
    </List>
  )
}


export default OrgPicker
