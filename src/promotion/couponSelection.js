import React, { Component } from 'react'
import { List } from 'antd-mobile'
import Coupon from '../coupon'
import gou from './img/gou.png'
import noCoupon from "./img/noCoupon.png"
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
    const { coupons, selectedCouponIndex } = this.state
    const { handleContainerClose } = this.props
    return (
      <div>
        <List><ListItem><div className='tcenter black font-x'>选择红包</div></ListItem></List>
        <div className='coupon-container touch-layer' style={{height:'calc(100% - 1.90rem)', overflowY: 'scroll'}}>
          {
            coupons.length > 0 ? coupons.map((c, index) => (
                                    <Coupon { ...c } key={ `coupon-selection-${ index }` } bSelected={ selectedCouponIndex == index } handleCouponType={ this.handleCouponType }
                                       onClick={ () => {
                                         if(!!c.deductionPrice) {
                                           this.handleChooseCoupon(index, c)
                                           handleContainerClose()
                                         }
                                       } } />
                                 ))
                               : <p className="noCoupon"><img src={noCoupon}/>暂无红包</p>
          }
        </div>
        <Footer handleChooseCoupon = {
          () => {
            this.handleChooseCoupon(-1)
            handleContainerClose()
          }
        } />
      </div>


    )
  }
}

export default CouponSelection

const Footer = ({ handleChooseCoupon }) => (<div className='coupon-footer tcenter' onClick={ handleChooseCoupon }>不使用红包</div>)
