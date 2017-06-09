import './style/coupon.scss'
import { Icon } from 'antd-mobile'

import React from 'react'

const NewCoupon = ({ title, subtitle, type, discount, value,  ets, orderType, handleCouponType, acitivityMutex,
                  bSelected, deductionPrice = 0, threshold,
                  onClick }) => {
  let availability = false      //表示当前优惠券是否可用
  if(deductionPrice !== 0){
    availability = true
  }
return (
  <div className='coupon-item'
       onClick={ onClick } >
     <p className={`p-left ${ availability? '' : 'ineffective' }`}>
       <span>{ type === 1 ? '¥' : '' }</span>{ type === 1 ? value : discount * 10 }<span style={{ fontSize: '.24rem' }}>{ type === 1 ? '' : '折' }</span>
     </p>
     <div className='d-center'>
       <p className='p-top'>
         <span className={`s-left ${ availability ? '' : 'ineffective' }`}>{ title }</span>
         <span className={`s-right ${ availability ? '' : 'ineffective' }`}>（满{ threshold }可用）</span>
       </p>
       <p className={`p-bottom ${ availability ? '' : 'ineffective' }`}>{ acitivityMutex ? '该优惠劵可用但不能与该平台活动同享' : '' }</p>
     </div>
     <p className='p-right'>
       { bSelected && !!deductionPrice && !acitivityMutex && <Icon type={ require('./img/check.svg') } /> }
     </p>
  </div>
)}



// <div className='block header pos-relative' style={{ backgroundImage:'url(' + (deductionPrice == 0 ? ineffective : effective) + ')' }}>
//   <span className='blod price-layer'>
//      { handleCouponType(type, discount, value) }
//   </span>
//   <span className='fright' style={{ width: '68%' }}>
//     <span className='block white blod' style={{ fontSize:".36rem", padding:'.32rem 0 0  .32rem' }}>{ title }</span>
//     <span className='block white' style={{ fontSize:".26rem", padding:'.10rem 0 0 .32rem' }}>{ subtitle }</span>
//     {
//       false && <span className='pos-absolute' style={{ top: '.40rem', right: '.40rem' }}><img src={ newCoupon } style={{ width:'1.60rem' }} /></span>
//     }
//     {
//       bSelected && <img className='pos-absolute' src={ choose } style={{ top: '40%', right: '.20rem', zIndex:'9', width:'.40rem' }} />
//     }
//   </span>
//   <img src={ deductionPrice == 0 ? ineffective_q : effective_q  } className='pos-absolute' style={{ width:'1.60rem', bottom: '.12rem', right: 0 }} />
// </div>
//
// <div className='block bottom'>
//   <span className='date' style={{ fontSize:".28rem" }}>{ `有效期：${ moment('YYYY.MM.DD')(ets * 1000) }` }</span>
//   <span className='fright orange font-s'>{ type.length == 1 ? '立即使用' : '' }</span>
// </div>

export default NewCoupon
