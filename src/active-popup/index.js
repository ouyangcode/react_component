import React, { Component } from 'react'
import { Flex, Icon, List, Switch, Toast } from 'antd-mobile'
import { getStore, send } from '@boluome/common-lib'
import { Mask } from '@boluome/oto_saas_web_app_component'

import './ActivePopup.scss'

class ActivePopup extends Component{
  constructor(props){
    super(props)
    const { OTO_SAAS = {} } = window
    const { customer = {} } = OTO_SAAS
    const { showActivePopup = false } = customer
    this.state = {
      promotionBackData: '',
      popupShow: showActivePopup,
      showActivePopup,
    }
    this.fetchActivity = this.fetchActivity.bind(this)
    this.getPromotionData = this.getPromotionData.bind(this)
    this.handlePopupIconClick = this.handlePopupIconClick.bind(this)
    this.handleClose
  }

  componentWillMount(){
    const { orderType, channel, amount } = this.props
    const postData = {
      userId: getStore('customerUserId', 'session'),
      orderType,
      channel,
      amount,
      target: 'platform',
      count: 1
    }
    amount && this.fetchActivity(postData)
  }

  componentWillReceiveProps(nextProps){
    if(this.props.amount !== nextProps.amount){
      const { orderType, channel, amount } = nextProps
      const postData = {
        userId: getStore('customerUserId', 'session'),
        orderType,
        channel,
        amount,
        target: 'platform',
        count: 1
      }
      if (!parseFloat(amount)) {
        this.setState({ promotionBackData: { target: 'unavailable' } })
        this.closeMask()
        return
      }
      // amount && this.fetchActivity(postData)
      if (amount) {
        this.fetchActivity(postData)
        this.setState({ popupShow: this.state.showActivePopup })
      }
    }
  }

  fetchActivity(para){
    send('/promotion/query_promotions', para, { 'Content-Type': 'application/x-www-form-urlencoded' })
    .then(({ code, data = {}, message }) => {
      const useMock = false       //是否使用模拟数据的开关，线上改成false
      if(useMock){
        // 模拟红包数据
        const promotionBackData = {
          target: 'platform',    //改变活动类型，共四种："platform","coupon","mixed","unavailable"
          activity: { deductionPrice: 10, title: '活动优惠' },
          coupons: [{ deductionPrice: 10 }]
        }
        this.getPromotionData(promotionBackData)
        return
      }
      if(code === 0) {
        this.getPromotionData(data)
      } else {
        // Toast.fail(message)
      }
    })
  }

  getPromotionData(data){
    const { handlePromotionChange, popupStyle  } = this.props
    const { showActivePopup, popupShow } = this.state

    const { target, activity, coupons } = data
    let promotionBackData = {}
    let discountPrice = 0
    promotionBackData.target = target
    // 根据target有选择的返回数据（短流程红包，只需要返回第一个数据）
    if (target === 'platform' || target === 'mixed') {
      promotionBackData.activity = activity
      discountPrice += activity.deductionPrice
    }
    if (target === 'coupon' || target === 'mixed') {
      promotionBackData.coupons = coupons[0]
      discountPrice += coupons[0].deductionPrice
    }
    this.setState({ promotionBackData })
    handlePromotionChange({ discountPrice, promotionBackData })

    if (target && target !== 'unavailable' && showActivePopup) {
      this.hanldeClose = Mask(<ActivityItem {...{ promotionBackData, handleCloseIcon: this.handlePopupIconClick }} />, { style: popupStyle, maskClosable: true, maskClick: () => {
        this.setState({ popupShow: !popupShow })
      } })
    }
  }

  handlePopupIconClick () {
    const { popupStyle } = this.props
    const { promotionBackData, popupShow } = this.state
    if (popupShow) {
      this.hanldeClose()
      this.setState({ popupShow: !popupShow })
    } else {
      this.hanldeClose = Mask(<ActivityItem {...{ promotionBackData, handleCloseIcon: this.handlePopupIconClick }} />, { style: popupStyle, maskClick: () => { this.setState({ popupShow }) } })
      this.setState({ popupShow: !popupShow })
    }
  }



  render(){
    const { popupShow, promotionBackData } = this.state
    console.log('popupShow', popupShow);
    const { target } = promotionBackData
    return (
      <div className='acitivity-icon'>
        { (target === 'mixed' || target === 'coupon' || target === 'platform') && <Icon className={ popupShow ? 'active-popup-icon active' : 'active-popup-icon' } type={ require('./img/arrow.svg')} onClick={ this.handlePopupIconClick } /> }
      </div>
    )
  }
}




const ActivityItem = ({ promotionBackData, handleCloseIcon }) => {
  const FlexItem = Flex.Item
  const ListItem = List.Item
  const { target, activity, coupons } = promotionBackData
  return (
    <div className='active-popup-container'>
      <Flex className='header'>
        <FlexItem>
          <Icon className='left' type='cross' color='#cccccc' size='lg' onClick={ handleCloseIcon } />
        </FlexItem>
        <FlexItem>
          <p className='center'>订单确认</p>
        </FlexItem>
        <FlexItem>
          <Icon className='right' type={ require('./img/tips.svg') } size='lg' style={{ display: 'none' }}  />
        </FlexItem>
      </Flex>
      <List>
        { (activity && (target==='platform' || target==='mixed')) && <ListItem extra={ `- ¥ ${ activity.deductionPrice }` }> <span className='ac-icon-style'>减</span>{ activity.title }</ListItem> }
        { (coupons && (target==='coupon' || target==='mixed')) && <ListItem extra={ `- ¥ ${ coupons.deductionPrice }` }>红包抵扣</ListItem> }
      </List>
    </div>
)}



// 开关
// <List.Item extra={<Switch
//     {...getFieldProps('Switch1', {
//       initialValue: true,
//       valuePropName: 'checked',
//       onChange: this.handleChange
//     })}
//   />}
// >默认开</List.Item>

export default ActivePopup
