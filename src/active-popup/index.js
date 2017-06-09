import React, { Component } from 'react'
import { unmountComponentAtNode } from 'react-dom'
import { Flex, Icon, List, Switch, Toast } from 'antd-mobile'
import { getStore, send } from '@boluome/common-lib'
import { Mask } from '@boluome/oto_saas_web_app_component'
import { createForm } from 'rc-form'

import './ActivePopup.scss'

class ActivePopup extends Component{
  constructor(props){
    super(props)
    this.state = {
      promotionBackData: {},
      popupShow: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.fetchActivity = this.fetchActivity.bind(this)
    this.getPromotionData = this.getPromotionData.bind(this)
    this.handlePopupClick = this.handlePopupClick.bind(this)
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
      amount && this.fetchActivity(postData)
    }
  }

  fetchActivity(para){
    send('/promotion/query_promotions', para, { 'Content-Type': 'application/x-www-form-urlencoded' })
    .then(({ code, data = {}, message }) => {
      const useMock = true       //是否使用模拟数据的开关，线上改成false
      if(useMock){
        // 模拟红包数据
        const promotionBackData = {
          activityType: 'platform',    //改变活动类型，共四种："platform","coupon","mixed","unavailable"
          activity: { deductionPrice: 10, title: '活动优惠' },
          coupons: [{ deductionPrice: 10 }]
        }
        this.setState({ promotionBackData })
        this.getPromotionData()
        return
      }

      if(code === 0) {
        data.activityType = data.target
        this.setState({ promotionBackData: data })
        this.getPromotionData()
      } else {
        // Toast.fail(message)
        console.log(message);
      }
    })
  }

  getPromotionData(){
    const handlePromotionChange = this.props.handlePromotionChange
    const { promotionBackData } = this.state
    const { popupStyle, defaultShow } = this.props
    const { activityType, activity, coupons } = promotionBackData
    let discountPrice = 0
    if(activityType === 'platform' || activityType === 'mixed'){
      discountPrice += activity.deductionPrice
    }

    if (activityType === 'coupon' || activityType === 'mixed') {
      discountPrice += coupons[0].deductionPrice
    }
    handlePromotionChange({ discountPrice, promotionBackData })

    if (activityType !== 'unavailable' && defaultShow) {
      Mask(<ActivityItem {...{ activityType, activity, coupons }} />, { style: popupStyle, maskClick: () => {
        this.setState({ popupShow: this.state.popupShow })
      } })
    }
  }

  handleChange(res){
    // this.props.handleSwitchChange(res)
  }

  handlePopupClick () {
    const { popupStyle } = this.props
    const { activityType, activity, coupons } = this.state.promotionBackData
    const maskNode = document.querySelector('.my-mask')
    this.setState({ popupShow: !this.state.popupShow })
    const closeMask = () => {
      unmountComponentAtNode(maskNode)
      maskNode.remove()
      document.documentElement.style.overflow = ''
    }
    if (maskNode) {
      closeMask()
    } else {
      Mask(<ActivityItem {...{ activityType, activity, coupons, handleCloseIcon: this.handlePopupClick }} />, { style: popupStyle, maskClick: () => {
        this.setState({ popupShow: !this.state.popupShow })
      } })
    }
  }



  render(){
    const { form } = this.props
    const { popupShow } = this.state
    const { getFieldProps } = form
    const { activityType } = this.state.promotionBackData
    return (
      <div className='acitivity-icon'>
        { (activityType === 'mixed' || activityType === 'coupon' || activityType === 'platform') && <Icon className={ popupShow ? 'active-popup-icon active' : 'active-popup-icon' } type={ require('./img/arrow.svg')} onClick={ this.handlePopupClick } /> }
      </div>
    )
  }
}




const ActivityItem = ({ activityType, activity, coupons, handleCloseIcon }) => {
  const FlexItem = Flex.Item
  const ListItem = List.Item

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
        { (activity && (activityType==='platform' || activityType==='mixed')) && <ListItem extra={ `- ¥ ${ activity.deductionPrice }` }> <span className='ac-icon-style'>减</span>{ activity.title }</ListItem> }
        { (coupons && (activityType==='coupon' || activityType==='mixed')) && <ListItem extra={ `- ¥ ${ coupons[0].deductionPrice }` }>红包抵扣</ListItem> }
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

export default createForm()(ActivePopup)
