// 样式引入
import '../style/index.scss'

import React from 'react'
import { setStore} from '@boluome/common-lib';
import { Mask, SlidePage, CitySearch } from '@boluome/oto_saas_web_app_component'
// import getListData from '../actions/app.js'

const App = (props) => {console.log('props==========',props)
   const { children } = props;
   const { listData =[], getListData, selectedCIty, goDetails } = props;
   console.log('listData',listData);
   const locationUrl = /192.168.|localhost/.test(location.hostname)
                  ? 'https://dev-api.otosaas.com'
                  : `${location.origin}/api`
   const cityUrl = locationUrl + '/basis/v1/fanggu/fungugu/cities';
   let hasData
   if (listData && listData.length > 0){
      hasData = ''
   } else {
      hasData = (<div className = "kongWrap">
                   <img src = { require('../img/noUse.png') } />
                   <div className = "tips">该城市尚未提供保洁服务敬请期待</div>
               </div>)
   }
   return (
      <div className = "listMain">
          <div className = "headerWrap">
             <div className = "header_l"></div>
             <div className = "header_c" onClick = { () =>
                  Mask(
                    <SlidePage target='left' >
                      <CitySearch localCity="上海" api = { cityUrl } callback = { (result) => getListData(result) }  />
                    </SlidePage>
                  , { mask: false, style: { position: 'absolute' } }
                  )
              }><span>{ selectedCIty }</span>
                <span><img className = "jiaoPic" src={ require('../img/jiao.png') }/></span>
              </div>
              <div className = "header_r"></div>
          </div>
          <div className = "contentWrap">
            {
                listData.map((item ,index) => (
                  <div key = { item.categoryId } className = "listItem" onClick = {() =>
                      goDetails(item.cityId, item.categoryId)
                  }>
                      <div className = "itemPic"><img src = { item.categoryIcon} /></div>
                      <div className = "item">
                            <span className = "title">{ item.categoryName }</span>
                            <span className = "theme">{ item.description }</span>
                            <span className = "price">￥{ item.price } / { item.unit }</span>
                            <span className = "channel">{ item.channel }</span>
                      </div>
                  </div>
                ))
            }

          </div>
          { hasData }
      </div>
   )
}


// Create a product list


export default App
