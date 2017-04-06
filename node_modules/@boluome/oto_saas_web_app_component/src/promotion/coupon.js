import './style/coupon.scss'

import React from 'react'

import effective     from './img/effective.png'
import effective_q   from './img/effective_q.png'
import ineffective   from './img/ineffective.png'
import ineffective_q from './img/ineffective_q.png'
import newCoupon     from './img/new.png'
import choose        from './img/coupon_choose.png'

import { moment } from '@boluome/common-lib'

const Coupon = ({ title, subtitle, type, discount, value,  ets, orderType, handleCouponType,
                  bSelected, deductionPrice = 0,
                  onClick }) => {
                    console.clear();
                    console.log(deductionPrice);
                    return (
  <div className={ `coupon ${ deductionPrice == 0 ? 'ineffective' : '' }` }
       onClick={ onClick } >
    <div className='block header pos-relative' style={{ backgroundImage:'url(' + (deductionPrice == 0 ? ineffective : effective) + ')' }}>
      <span className='blod price-layer'>
         { handleCouponType(type, discount, value) }
      </span>
      <span className='fright' style={{ width: '68%' }}>
        <span className='block white blod' style={{ fontSize:".36rem", padding:'.32rem 0 0  .32rem' }}>{ title }</span>
        <span className='block white' style={{ fontSize:".26rem", padding:'.10rem 0 0 .32rem' }}>{ subtitle }</span>
        {
          false && <span className='pos-absolute' style={{ top: '.40rem', right: '.40rem' }}><img src={ newCoupon } style={{ width:'1.60rem' }} /></span>
        }
        {
          bSelected && <img className='pos-absolute' src={ choose } style={{ top: '40%', right: '.20rem', zIndex:'9', width:'.40rem' }} />
        }
      </span>
      <img src={ deductionPrice == 0 ? ineffective_q : effective_q  } className='pos-absolute' style={{ width:'1.60rem', bottom: '.12rem', right: 0 }} />
    </div>

    <div className='block bottom'>
      <span className='date' style={{ fontSize:".28rem" }}>{ `有效期：${ moment('YYYY.MM.DD')(ets * 1000) }` }</span>
      <span className='fright orange font-s'>{ type.length == 1 ? '立即使用' : '' }</span>
    </div>
  </div>
)}

export default Coupon
