// 样式引入
import '../style/details.scss'

import React from 'react'
import { setStore} from '@boluome/common-lib';
import { Mask, SlidePage } from '@boluome/oto_saas_web_app_component'



const Details = (props) => {console.log('props==========',props)
   const { children } = props;
   const { detailsData = {} , goBackPage } = props;console.log('ssss==='+detailsData)
   let introductions = detailsData.introduction;console.log('introductions----' +detailsData.introduction)
   let notes = detailsData.note;
   if(!introductions){
      introductions = []
   }
   if(!notes){
      notes =[]
   }
   return (
       <div className = "detailsWrap">
          <div className = "headerDetails">
              <div className = "header_l" onClick = {() => {
                 window.history.go(-1)
              }}>
                  <img src={ require ( "../img/fanhuis.png" )} />
              </div>
              <div className = "header_c">
                  服务详情
              </div>
              <div className = "header_r"></div>
          </div>
          <div className = "detailsMain">
              <div className = "detailsPic">
                    <div className = "details_img"><img src={ detailsData.banner } /></div>
                    <div className = "details_price">
                        <div className = "title">{ detailsData.categoryName }</div>
                        <div className = "price">￥<span>{ detailsData.price } / { detailsData.unit }</span></div>
                    </div>
                </div>
                <div className = "detailsSer otm ">
                    <div className = "iconTitle">
                        <img className = "icon" src = { require ('../img/jieshao.png') }/>
                        <span>服务介绍</span>
                    </div>
                    <div className = " detailsPrice">
                      {
                         introductions.map((item, index) => (
                           <p key = { index }>{ item }</p>
                         ))
                      }
                    </div>
                </div>
                <div className = "detailsSer otm ">
                    <div className = "iconTitle">
                        <img className = "icon" src = { require ('../img/jiage.png') }/>
                        <span>价格说明</span>
                    </div>
                    <div className = " detailsPrice">
                      <img src = { detailsData.serviceDescription } />
                    </div>
                </div>
                <div className = "detailsSer otm ">
                    <div className = "iconTitle">
                        <img className = "icon" src = { require ('../img/liucheng.png') }/>
                        <span>服务流程</span>
                    </div>
                    <div className = " detailsPrice">
                      <img src = { detailsData.flow } />
                    </div>
                </div>
                <div className = "detailsSer otm ">
                    <div className = "iconTitle">
                        <img className = "icon" src = { require ('../img/sever.png') }/>
                        <span>服务承诺</span>
                    </div>
                    <div className = " detailsPrice">
                      <img src = { detailsData.guarantee } />
                    </div>
                </div>
                <div className = "detailsSer otm ">
                    <div className = "iconTitle">
                        <img className = "icon" src = { require ('../img/xuzhi.png') }/>
                        <span>预约须知</span>
                    </div>
                    <div className = " detailsPrice">
                      {
                         notes.map((item, index) => (
                           <p key = { index }>{ item }</p>
                         ))
                      }
                    </div>
                </div>
          </div>
          <div className = "orderBtnWrap">
              <div className = "orderBtn" onClick = {() => {
                    goBackPage( detailsData.cityId, detailsData.categoryId )
              }}>立即预定</div>
          </div>
       </div>
   )
}


// Create a product list


export default Details
