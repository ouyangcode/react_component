import '../styles/index.scss'

import React from 'react'
import { Tabs } from 'antd-mobile'

const TabPane = Tabs.TabPane

  //activeIndex 当前激活的服务id，  defaultCategoryId 默认的服务id，本地历史
const Service = ({ handleSelectServer, services = [{categoryId:""}], defaultCategoryId, activeIndex }) => {
  if(services[0].categoryId){
    defaultCategoryId = defaultCategoryId ? defaultCategoryId : services[0].categoryId
    activeIndex = activeIndex ? activeIndex : defaultCategoryId
    return (
      <ul className="service-tab">
        {
          services.map(({ blmName, cityId, categoryId }, index) => (
            <li key={ categoryId } className={activeIndex == categoryId ? "active" : ""} onClick={() => handleSelectServer(categoryId)}>{ blmName }</li>
          ))
        }
      </ul>)
  }else {
    return (<div className="service-tab"></div>)
  }
}

export default Service
