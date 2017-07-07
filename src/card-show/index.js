import React, { Component } from 'react'
import { List } from 'antd-mobile'
import { get, send, getStore } from '@boluome/common-lib'
import { merge, clone } from 'ramda'
import './style/index.scss'

const Item = List.Item
class CardShow extends Component {
  constructor(props) {
    super(props)
    const { openCard, onChange }   = this.props
    this.state = {
      openCard,
      onChange,
    }
    this.handleGoaddrMap = this.handleGoaddrMap.bind(this)
  }
  componentWillReceiveProps(nextProps) {
    const { openCard, onChange }   = nextProps
    this.setState({
      openCard,
      onChange,
    })
  }
  handleGoaddrMap() {
    const { onChange } = this.props
    onChange()
  }
  render() {
    const { nameTitle = '', startTime = '', durationTime = '', nodurationTime = '', endTime = '', textArr = [], startDate = '', endDate = '', imgIcon = '', addressStr = '' } = this.state.openCard
    return (
      <div className='CardShowComponent'>
        <div className='orderCard'>
          <Item className='ordertitle'>{ nameTitle }</Item>
          <div className='line' />
          <div className='ordertime'>
            <div className='timest timeoto'>
              <span className='time'>{ startTime ? startTime : '暂无' }</span>
              <span className='text'>{ textArr[0] }</span>
              <span className='day'>{ startDate }</span>
            </div>
            <div className='jobtime'>
              <img alt='' src={ imgIcon } />
              <span>{ durationTime ? durationTime : '商家暂未提供具体时间' }</span>
              { durationTime ? (<span style={{ color: '#fff' }} >不许去掉</span>) : (<span >{ nodurationTime }</span>) }
            </div>
            <div className='timend timeoto'>
              <span className='time'>{ endTime ? endTime : '暂无' }</span>
              <span className='text'>{ textArr[1] }</span>
              <span className='day'>{ endDate }</span>
            </div>
          </div>
          <Item extra={ textArr[3] }>{ textArr[2] }</Item>
          <div className='line' style={{ height: '1px' }} />
          <Item wrap={ 'true' } arrow='horizontal' className='orderaddr' onClick={ () => this.handleGoaddrMap() }>{ textArr[4] } { addressStr }</Item>
        </div>
      </div>
    )
  }
}

export default CardShow
