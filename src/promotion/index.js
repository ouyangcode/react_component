import React, { Component } from 'react'
import { List }        from 'antd-mobile'
import SlidePage       from '../slide-page'
import Mask            from '../mask'
import CouponSelection from './couponSelection'
import choosenIcon     from './img/choose.png'
import nochoosenIcon   from './img/nochoose.png'

import { getStore, send }  from '@boluome/common-lib'
import { merge } from 'ramda'
//正式使用需要设成false
const usingMockData = false

const ListItem = List.Item

let activityQueryData = {}

class Promotion extends Component {
  constructor(props) {
    super(props)
    this.state = {
        amount: 0,
        count : 1
    }
  }

  componentWillMount() {
      const { orderType, channel, amount, count = 1 } = this.props
      this.fetchActivity({
        userId: getStore('customerUserId', 'session'),
        orderType,
        channel,
        amount,
        target: 'platform',
        count
      })
  }

  componentWillReceiveProps() {
    const { orderType, channel, amount, count = 1 } = this.props
    if (this.state.amount !== amount || this.state.count !== count ) {
        this.setState({ amount, count })
        this.fetchActivity({
          userId: getStore('customerUserId', 'session'),
          orderType,
          channel,
          amount,
          target: 'platform',
          count
        })
    }
  }

  fetchActivity(data) {
    const { couponId, amount, count = 1 } = data
    activityQueryData = merge(activityQueryData, data)
    let postData = activityQueryData
    if(!couponId) {
      delete postData.couponId
    }

    send('/promotion/query_promotions', postData, { 'Content-Type': 'application/x-www-form-urlencoded' })
    .then(({ code, data = {}, message }) => {
      if(usingMockData) {
        code = 0
        data = mockData
      }

      if(code === 0) {
        const { target, coupons, activity } = data
        this.setState({ activityType: target, activity, coupons, amount, count })
      } else {
        console.log(message)
      }
      this.processing()
    })
  }
  processing() {
    const { activityType, coupons = [], activity = {}, selectedCouponIndex = 0 } = this.state
    const { handleChange } = this.props
    const { deductionPrice } = activity
    let discountPrice = 0

    let couponText = '无可用红包'
    let currentCoupon
    let bActivityUnavailable = !!!deductionPrice

    if(activityType === 'platform' || activityType === 'mixed') {
      discountPrice += activity.deductionPrice
    }

    if(coupons.length > 0) {
      if (activityType == 'coupon' || activityType === 'mixed') {
        currentCoupon = coupons[selectedCouponIndex]
        if(selectedCouponIndex === -1) {
          couponText = `有${ coupons.filter(item => item.deductionPrice > 0).length }个可用红包`
        } else if(currentCoupon.deductionPrice > 0) {
          discountPrice += currentCoupon.deductionPrice
          couponText = `优惠减免 ￥${ currentCoupon.deductionPrice }`
        }
      }
      else if (activityType === 'unavailable') {
        // couponText = `有${ coupons.length }个可用红包`
      }
      else {
        couponText = '红包不可与活动同时使用'
      }
    }
    let bActivityEffective = activityType === 'platform' || activityType === 'mixed'

    const changeData = {
      discount: discountPrice
    }

    if(currentCoupon) {
      changeData.coupon   = currentCoupon
    }
    if(bActivityEffective && !bActivityUnavailable) {
      changeData.activity = activity
    }

    this.setState({ couponText, bActivityEffective, bActivityUnavailable, discountPrice, selectedCouponIndex })
    handleChange(changeData)

  }
  handleChooseCoupon(index, coupon = {}) {
    const { id } = coupon
    this.fetchActivity({ couponId: id })
    this.setState({ selectedCouponIndex: index >= 0 ? 0 : -1, currentCoupon: coupon, bSlideShow: false, slideChildren: '' })
  }
  render() {

    const {
      couponText = '', bActivityEffective, bActivityUnavailable = true, discountPrice, coupons, activity, bSlideShow, slideChildren, selectedCouponIndex = 0
    } = this.state

    return (
      <List>
        <ListItem arrow='horizontal' extra={ couponText } className={ 'no-border' }
                  onClick={ () => Mask(<SlidePage target='right' type='root'>
                                        <CouponSelection { ...{ coupons, selectedCouponIndex, handleChooseCoupon: this.handleChooseCoupon.bind(this) } } />
                                       </SlidePage>, { mask: false })
                          } >
          <span className='gray-1'>红包</span>
        </ListItem>
        {
          activity && (
            <ListItem onClick={ () => this.fetchActivity({ couponId: '' }) }
                      style={{ backgroundColor: '#fff2df', height: (!bActivityEffective || bActivityUnavailable) ? '.45rem' : '.30rem' }}
                      extra={ bActivityUnavailable ? '' : (<img src={ bActivityEffective ? choosenIcon : nochoosenIcon }
                                                                style={{ height: '.36rem', width: '.36rem' }} />)
                            } >
              <div>
                <div className={ `brand-color font-m` }>
                  { activity.title }
                </div>
                {
                  (!bActivityEffective || bActivityUnavailable) ? (
                    <div className={ `gray-1` } style={{ fontSize: '.22rem', lineHeight: '.36rem' }}>
                      { bActivityUnavailable ? '未满足活动优惠条件' : !bActivityEffective ? '不可与红包同时使用' : '' }
                    </div>
                  ) : ''
                }
              </div>
            </ListItem>
          )
        }
      </List>
    )
  }
}

export default Promotion

//测试数据，修改target看效果
const mockData = {

  'couponNum': 0,
  'payPrice': 32.0,
  'target': 'coupon',
  'activity': {
    'mutex': 1,
    'deductionPrice': 10,
    'subtitle': null,
    'id': '584a0b1f18d2462600e3e6bd',
    'title': '\u6ee125\u7acb\u51cf10\u5143'
  },
  coupons: [
    {
          'discount': 1,
          'deductionPrice': 12,
          'subtitle': '\u6ee125\u5143\u53ef\u7528',
          'title': '12\u5143\u5916\u5356\u4f18\u60e0\u5238',
          'threshold': 25,
          'mutex': 1,
          'ets': 1480608000.0,
          'type': 1,
          'id': '100000042926',
          'value': 12
      }, {
          'discount': 1,
          'deductionPrice': 0,
          'subtitle': '\u6ee125\u5143\u53ef\u7528',
          'title': '12\u5143\u5916\u5356\u4f18\u60e0\u5238',
          'threshold': 25,
          'mutex': 1,
          'ets': 1480608000.0,
          'type': 1,
          'id': '100000042927',
          'value': 12
      }, {
          'discount': 1,
          'deductionPrice': 12,
          'subtitle': '\u6ee125\u5143\u53ef\u7528',
          'title': '12\u5143\u5916\u5356\u4f18\u60e0\u5238',
          'threshold': 25,
          'mutex': 1,
          'ets': 1480608000.0,
          'type': 1,   // price - deducationPrice
          'id': '100000042931',
          'value': 12
      }
    ]
}
