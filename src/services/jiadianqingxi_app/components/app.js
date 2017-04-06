// 样式引入
import '../style/index.scss'

import React from 'react'
import { setStore} from '@boluome/common-lib';
import { Mask, SlidePage, CitySearch } from '@boluome/oto_saas_web_app_component'



const App = (props) => {console.log('props==========',props)
   const { children } = props;
   const { listDate =[] } = props;
   const locationUrl = /192.168.|localhost/.test(location.hostname)
                  ? 'https://dev-api.otosaas.com'
                  : `${location.origin}/api`
   const cityUrl = locationUrl + '/basis/v1/fanggu/fungugu/cities'
   return (
      <div className = "listMain">
          <div className = "headerWrap">
             <div className = "header_l"></div>
             <div className = "header_c" onClick = { () =>
                  Mask(
                    <SlidePage target='left' >
                      <CitySearch localCity="上海 " api = { cityUrl } />
                    </SlidePage>
                  , { mask: false, style: { position: 'absolute' } }
                  )
              }><span>上海</span>
                <span><img className = "jiaoPic" src={ require('../img/jiao.png') }/></span>
              </div>
              <div className = "header_r"></div>
          </div>
          <div className = "contentWrap">
            {
              listDate.map((item ,index) => (
                <div key = {index} className = "listItem">
                    <div className = "itemPic"><img src = { item.categoryIcon} /></div>
                    <div className = "item">
                          <span className = "title">{ item.categoryName }</span>
                          <span className = "theme">{ item.description }</span>
                          <span className = "kong"></span>
                          <span className = "price">￥{ item.price } / { item.unit }</span>
                    </div>
                </div>
              ))
            }
          </div>
      </div>
   )
}


// Create a product list


export default App
