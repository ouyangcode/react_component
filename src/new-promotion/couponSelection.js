import React, { Component } from 'react'
import { List, Popup, Icon } from 'antd-mobile'
import NewCoupon from '../new-coupon'
import gou from './img/gou.png'
import "./style/couponSelection.scss"

const ListItem = List.Item

class CouponSelection extends Component {
  constructor(props) {
    super(props)
    let { coupons = [], selectedCouponIndex, handleChooseCoupon } = props
    this.handleChooseCoupon = handleChooseCoupon
    this.state = {
      is_show: false,
      coupons,
      selectedCouponIndex
    }
  }

  componentWillReceiveProps(nextProps) {
    const { selectedCouponIndex } = nextProps
    this.setState({ selectedCouponIndex })
  }
  handleCouponType(type, discount, value) {
    switch (type) {
      case 2 : return <label><span className='price'>{ discount * 10 }</span><span className='font-l white'>折</span></label>
      default: return <label><span className='font-l white'>￥</span><span className='price'>{ value }</span></label>
    }
  }

  render() {
    const { coupons = [], selectedCouponIndex } = this.state
    const { acitivityMutex } = this.props
    console.log('selectedCouponIndex', selectedCouponIndex);
    return (
      <div className='coupon-selection'>
        <ul className='coupon-selection-header'>
          <li className='left' onClick={ () => Popup.hide() }>取消</li>
          <li className='center'>选择红包</li>
        </ul>
        {
          coupons.length > 0 ?
          <div className='coupon-selection-bottom'>
            <Header handleChooseCoupon = {
                () => {
                  this.handleChooseCoupon(-1)
                  Popup.hide()
                }
              }
              selectedCouponIndex={ selectedCouponIndex }
              />
            <div className='coupon-container touch-layer' style={{height:'calc(100% - 1.90rem)', overflowY: 'scroll'}}>
              {
                coupons.map((c, index) => (
                  <NewCoupon { ...c } acitivityMutex={ acitivityMutex } key={ `coupon-selection-${ index }` } bSelected={ selectedCouponIndex == index } handleCouponType={ this.handleCouponType }
                    onClick={ () => {
                      if(!!c.deductionPrice && c.mutex === 0) {
                        this.handleChooseCoupon(index, c)
                        Popup.hide()
                      }
                    } } />
                  ))
                }
              </div>
            </div> :
            <div className='no-coupon'>
              <img src={ require('./img/noCoupon.png') } alt='没有红包' />
              <p>暂无红包</p>
            </div>
        }
      </div>


    )
  }
}

export default CouponSelection

const Header = ({ handleChooseCoupon, selectedCouponIndex }) => {
  return (
    <div className='coupon-header' onClick={ handleChooseCoupon }>
      <p>不使用红包</p>
      {
        selectedCouponIndex === -1 && <Icon type={ require('../new-coupon/img/check.svg') } />
      }
    </div>)
}
