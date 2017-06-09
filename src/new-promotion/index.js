import React, { Component } from 'react'
import { List, Accordion, Popup }        from 'antd-mobile'
import SlidePage       from '../slide-page'
import Mask            from '../mask'
import CouponSelection from './couponSelection'
import choosenIcon     from './img/choose.png'
import nochoosenIcon   from './img/nochoose.png'

import { getStore, send, numToChinese }  from '@boluome/common-lib'
import { merge } from 'ramda'

import './style/promotion.scss'

//正式使用需要设成false
const usingMockData = false

const ListItem = List.Item

let activityQueryData = {}

class NewPromotion extends Component {
  constructor(props) {
    super(props)
    const { count=1 } = props
    this.state = {
      couponText: '',
      acitivityMutex : false,
      count
    }
    this.fetchactivity = this.fetchactivity.bind(this)
    this.processing = this.processing.bind(this)
  }

  componentWillMount() {
    const { orderType, channel, amount, count=1 } = this.props
    this.fetchactivity({
      userId: getStore('customerUserId', 'session'),
      orderType,
      channel,
      amount,
      target: 'platform',
      count
    })
  }

  componentWillReceiveProps(nextProps) {
    const { orderType, channel, amount, count=1 } = this.props
    const [ nextAmount, nextCount ]  = [ nextProps.amount, nextProps.count ]
    if (nextAmount && amount !== nextAmount ) {
        this.setState({ amount: nextAmount, count: nextCount })
        this.fetchactivity({
          userId: getStore('customerUserId', 'session'),
          orderType,
          channel,
          amount: nextAmount,
          target: 'platform',
          count: nextCount
        })
    }
  }

  componentWillUnmount() {
    Popup.hide()
  }

  fetchactivity(data) {
    const { couponId, amount } = data
    activityQueryData = merge(activityQueryData, data)
    let postData = activityQueryData
    if(!couponId) {
      delete postData.couponId
    }

    // 测试的url：https://dev-api.otosaas.com/test/promotion/query_promotions,  并添加, { appCode: 'blm' }
    send('/promotion/v2/query_promotions', postData, { appCode: 'blm' })
    .then(({ code, data = {}, message }) => {
      if(usingMockData) {
        code = 0
        data = mockData
      }

      if(code === 0) {
        let { target, coupons, activities, activity } = data
        if(activity) activities = [activity]
        this.setState({ activityType: target, activities, coupons, amount })
      } else {
        console.log(message)
      }
      this.processing()
    })
  }
  processing() {
    const { activityType, coupons = [], activities = [{}], selectedCouponIndex = 0 } = this.state
    const { amount } = this.props
    const { handleChange } = this.props
    const { deductionPrice } = activities[0]
    let discountPrice = 0

    let couponText = <p style={{ color: '#ccc' }}>无可用红包</p>
    let currentCoupon
    let bactivityUnavailable = !!!deductionPrice

    if(activityType === 'platform' || activityType === 'mixed') {
      discountPrice += activities[0].deductionPrice
      if(activities[0].mutex === 1) this.setState({ acitivityMutex : true })    //当活动类型为platForm且当前选中活动与红包是互斥的，那么所有的红包都显示与活动不可同享，通过acitivityMutex
    }

    if(coupons.length > 0) {
      if (activityType == 'coupon' || activityType === 'mixed') {
        currentCoupon = coupons[selectedCouponIndex]
        if(selectedCouponIndex === -1) {
          couponText = <p style={{ color: '#fff', background:'#ff4848', borderRadius:'4px', width:'1.80rem', height:'.5rem', textAlign: 'center', float: 'right', lineHeight: '.5rem' }}>{ coupons.filter(item => item.deductionPrice > 0).length }个红包可用</p>
        } else {
          const { deductionPrice } = currentCoupon
          if(deductionPrice) {
            discountPrice += deductionPrice
            couponText = <p style={{ color: '#ff4848' }}>{ `- ￥ ${ deductionPrice }` }</p>
          }
        }
      }
      else {
        couponText = <p style={{ color: '#fff', background:'#ff4848', borderRadius:'4px', width:'1.80rem', height:'.5rem', textAlign: 'center', float: 'right', lineHeight: '.5rem' }}>{ coupons.filter(item => item.deductionPrice > 0).length }个红包可用</p>
      }
    }
    let bactivityEffective = activityType === 'platform' || activityType === 'mixed'

    const changeData = {
      discount: discountPrice
    }

    if(currentCoupon) {
      changeData.coupon   = currentCoupon
    }
    if(bactivityEffective && !bactivityUnavailable) {
      changeData.activities = activities[0]
    }

    this.setState({ couponText, bactivityEffective, bactivityUnavailable, discountPrice, selectedCouponIndex })
    handleChange(changeData)

  }
  handleChooseCoupon(index, coupon = {}) {
    const { id } = coupon
    this.fetchactivity({ couponId: id })
    this.setState({ selectedCouponIndex: index >= 0 ? 0 : -1, currentCoupon: coupon, bSlideShow: false, slideChildren: '', acitivityMutex: false })
  }
  render() {

    const {
      couponText, bactivityEffective, bactivityUnavailable = true, acitivityMutex, activityType,
      discountPrice, coupons, activities, bSlideShow, slideChildren, selectedCouponIndex = 0, count
    } = this.state
    const { amount } = this.props
    return (
      <List className='s-promotion'>
        <ListItem extra={ `¥ ${ amount.toFixed(2) }` } className='s-order-price'>订单总额</ListItem>
        {
          activities &&
          activities.length > 0 ?
            activities.length > 1 ?
              (
                <Accordion defaultActiveKey="1" className="activity" onChange={this.onChange}>
                  <Accordion.Panel header={ <ActivityItem { ...{ activityInfo: activities[0], availability: bactivityEffective, amount, count, isFirst: true, activityType }} /> }>
                    <List className="my-list">
                      {
                        activities.map((item, index) => {
                          const { title, deductionPrice, threshold, mutex } = item
                          let bIndex = 1  //下面的展示的就从第二个索引处开始
                          if(index >= bIndex){
                            return (
                              <ListItem key={ index }>
                                <ActivityItem { ...{ activityInfo: item, availability: false, amount, count, activityType }} />
                              </ListItem>)
                          }
                        })
                      }
                    </List>
                  </Accordion.Panel>
                </Accordion>
              ) :
              (
                <ListItem>
                  <ActivityItem { ...{ activityInfo: activities[0], availability: bactivityEffective, amount, count, isFirst: true, activityType }} />
                </ListItem>
              )
            : ''
        }
        <ListItem arrow='horizontal' extra={ couponText } className='coupon'
                  onClick={ () => Popup.show(<CouponSelection { ...{ coupons, selectedCouponIndex, acitivityMutex, handleChooseCoupon: this.handleChooseCoupon.bind(this) } } />,
                                              { animationType: 'slide-up' })
                          } >
          <span>红包抵扣／兑换红包</span>
        </ListItem>
      </List>
    )
  }
}

export default NewPromotion


class ActivityItem extends React.Component {
  constructor(props) {
    super(props)
  }
  render(){
    const { activityInfo, availability, amount, count, isFirst=false, activityType } = this.props
    const { title = '', deductionPrice='', threshold=0, mutex='0', discountoff='', type } = activityInfo

    // rightInfo表示右侧需要显示的文字
    let rightInfo = ''
    if (threshold > amount) {
      if (type === 1 || type === 2) rightInfo = `还差${ (threshold - amount).toFixed(2) }元`
      if(type === 3 || type === 4) rightInfo = `还差${ numToChinese((threshold - count).toFixed(0)) }件`
    } else {
      if(activityType === 'coupon') {
        if (isFirst) {
          rightInfo = '与红包不可同享'
        } else {
          if(deductionPrice) rightInfo = `已满${ threshold }可减${ deductionPrice }`      //不能在availability的判断下面，因为活动可用时，rightInfo就使用这一种写法了
          if(discountoff) rightInfo = `已满${ threshold }可打${ discountoff * 10 }折`      //不能在availability的判断下面，因为活动可用时，rightInfo就使用这一种写法了
        }
      } else {
        if(deductionPrice) rightInfo = `- ¥ ${ deductionPrice }`
      }
    }
    return (
      <ul className='activity-item'>
        <li>
          <p className={ availability ? '' : 'unavailable' }>减</p>
          <span></span>
        </li>
        <div>
          <p className={ availability ? 'left' : 'unavailable left' }>{ title }</p>
          <p className={ availability ? 'right' : 'unavailable right' }>{ rightInfo }</p>
        </div>
      </ul>
    )
  }
}

//测试数据，修改target看效果
const mockData =
{
  activities:
  [
    {
      discount:1,
      id:"667",
      mutex:0,
      subtitle:null,
      threshold:500,
      title:"满阿斯顿计分卡监考老师的风景啊善良的看法将阿里；世纪东方卡拉斯京地方500-10",
      type:1,
      value:10
    },
    {
      discount:1,
      id:"667",
      mutex:0,
      subtitle:null,
      threshold:600,
      title:"满600-10",
      type:1,
      value:10
    },
    {
      discount:1,
      id:"667",
      mutex:0,
      subtitle:null,
      threshold:700,
      title:"满700-10",
      type:1,
      value:10
    },
  ],
  coupons:
  [
    {
      deductionPrice:0,
      discount:0.99,
      discountoff:0.01,
      ets:1496073600,
      id:"11540494",
      mutex:0,
      subtitle:"1",
      threshold:0,
      title:"任意金额99折",
      type:2,
      value:30
    },
    {
      discount:0.99,
      discountoff:0.01,
      ets:1496073600,
      id:"11540474",
      mutex:0,
      subtitle:"测试不可用",
      threshold:1000,
      title:"满1000可用券",
      type:2,
      value:100
    },
    {
      deductionPrice:90.99,
      discount:1,
      discountoff:0,
      ets:1496073600,
      id:"11540652",
      mutex:0,
      subtitle:"3",
      threshold:20,
      title:"满20-5",
      type:1,
      value:99.99
    }
  ],
  payPrice:0.01,
  target:"coupon"
}





//
//
// {
//
//   'couponNum': 0,
//   'payPrice': 32.0,
//   'target': 'mixed',
//   'activities': [
//     {
//       'mutex': 1,
//       'subtitle': null,
//       'deductionPrice': 10,
//       'threshold': 25,
//       'id': '584a0b1f18d2462600e3e6bd',
//       'title': '\u6ee125\u7acb\u51cf10\u5143'
//     },
//     {
//       'mutex': 0,
//       'subtitle': null,
//       'id': '584a0b1f18d2462600e3e6bd',
//       'title': '\u6ee125\u7acb\u51cf10\u5143',
//       threshold: '10000'
//     },
//     {
//       'mutex': 1,
//       'deductionPrice': 10,
//       'subtitle': null,
//       'id': '584a0b1f18d2462600e3e6bd',
//       'title': '\u6ee125\u7acb\u51cf10\u5143'
//     }
//   ],
//   coupons: [
//     {
//           'discount': 1,
//           'deductionPrice': 6,
//           'subtitle': '\u6ee125\u5143\u53ef\u7528',
//           'title': '12\u5143\u5916\u5356\u4f18\u60e0\u5238',
//           'threshold': 25,
//           'mutex': 1,
//           'ets': 1480608000.0,
//           'type': 1,
//           'id': '100000042927',
//           'value': 7
//       }, {
//           'discount': 1,
//           'deductionPrice': 0,
//           'subtitle': '\u6ee125\u5143\u53ef\u7528',
//           'title': '12\u5143\u5916\u5356\u4f18\u60e0\u5238',
//           'threshold': 25,
//           'mutex': 1,
//           'ets': 1480608000.0,
//           'type': 1,
//           'id': '100000042927',
//           'value': 12
//       }, {
//           'discount': 1,
//           'deductionPrice': 12,
//           'subtitle': '\u6ee125\u5143\u53ef\u7528',
//           'title': '12\u5143\u5916\u5356\u4f18\u60e0\u5238',
//           'threshold': 25,
//           'mutex': 1,
//           'ets': 1480608000.0,
//           'type': 1,   // price - deducationPrice
//           'id': '100000042931',
//           'value': 12
//       }]
// }
