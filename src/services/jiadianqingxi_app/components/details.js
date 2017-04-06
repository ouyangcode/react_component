// 样式引入
import '../style/details.scss'

import React from 'react'
import { setStore} from '@boluome/common-lib';
import { Mask, SlidePage } from '@boluome/oto_saas_web_app_component'



const Details = (props) => {console.log('props==========',props)
   const { children } = props;
   const { detailsDate =[] } = props;
   return (
       <div className = "detailsWrap">
          
       </div>
   )
}


// Create a product list


export default Details
