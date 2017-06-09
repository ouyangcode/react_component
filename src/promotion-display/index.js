import React    from 'react'
import { List } from 'antd-mobile'
import ic_hui   from './img/ic_hui.png'
import ic_jian  from './img/ic_jian.png'

const ListItem = List.Item

const iconStyle = {
  width : '.30rem',
  height: '.30rem',
  marginRight: '.12rem',
  position: 'relative',
  top: '-.02rem'
}

const PromotionDisplay = ({ activity, coupon }) => (
  <List className='no-border'>
    <ListItem extra={ <span className='red'>{ `-￥${ coupon ? coupon.deductionPrice : 0 }` }</span> }  >
      <span className='gray-1'><img src={ic_jian} style={ iconStyle } />红包抵扣</span>
    </ListItem>
    <ListItem extra={ <span className='red'>{ `-￥${ activity ? activity.deductionPrice : 0 }` }</span> } >
      <span className='gray-1'><img src={ic_hui} style={ iconStyle } />活动优惠</span>
    </ListItem>
  </List>
)
// {
//   activity ? (
//
//   ) : ''
// }
export default PromotionDisplay
