import React from 'react'
import { browserHistory } from 'react-router'
import { Tabs } from 'antd-mobile'

import Basic from './basic-components'
import Service  from './service-components'

import UserCenter from './d/user-center'

const TabPane = Tabs.TabPane

const App = ({ children }) => (
  <div>
    <Tabs swipeable={ false } defaultActiveKey='2' >
      <TabPane tab='基础组件' key='1'>
        <Basic />
      </TabPane>
      <TabPane tab='业务组件' key='2'>
        <Service />
      </TabPane>
    </Tabs>

    <UserCenter categoryCode='dianying'  />
  </div>
)


export default App
