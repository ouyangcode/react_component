import './style/index.scss'
import React, { Component } from 'react'
import { Icon } from 'antd-mobile'
import { getStore, stringifyQuery } from '@boluome/common-lib'
import { merge, compose, ifElse, always, equals, type, length, both, gt, __ } from 'ramda'
class Center extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  //当点击时
  handleClick() {
    const { categoryCode, orderTypes } = this.props
    const customerUserId = getStore('customerUserId', 'session')
    const query          = compose(stringifyQuery, merge({ customerUserId }))(ifElse(both(compose(equals('String'), type), compose(gt(__, 0), length)), always({ orderTypes }), always({}))(orderTypes))
    location.href = `/${ categoryCode }/list${ query }`
  }
  //当触摸开始
  handleStart(e) {
    document.body.style.overflow = 'hidden'
    const { clientX, clientY } = e.touches[0]

    this.beginPoint = { clientX, clientY }
  }
  //当触摸结束
  handleEnd(e, ct = 0) {
    document.body.style.overflow = ''
    const int = this.int
    const { clientX, clientY }   = e.changedTouches[0]

    if(Math.abs(this.beginPoint.clientX - clientX) < 50 &&
       Math.abs(this.beginPoint.clientY - clientY) < 50  ) return

    const { offsetHeight, offsetWidth } = document.body
    const o = this.refs.userCenter
    const h = int(offsetHeight / 40)
    const w = int(offsetWidth  / 2)
    const t = h * 5

    if(clientY < t) {
      ct = offsetHeight - t
    } else if(clientY > (offsetHeight - offsetHeight * 0.15)) {
      ct = '15%'
    } else {
      ct = offsetHeight - Math.round(clientY / h) * h - h / 2
    }
    o.style.transition = 'all .2s ease'
    o.style.bottom     = ct
    o.style.right      = clientX > w ? '8%' : '80%'
    o.addEventListener('transitionend', () => {
      o.style.transition = ''
    })
  }
  //当触摸移动
  handleMove(e) {
    e.preventDefault()
    const { clientX, clientY }          = e.touches[0]

    const { offsetHeight, offsetWidth } = document.body
    const o = this.refs.userCenter
    const s = this.computedStyle(o)
    const { height, width } = s
    o.style.bottom = offsetHeight - clientY - this.int(height) / 2
    o.style.right  = offsetWidth  - clientX - this.int(width) / 2
  }
  int(n) {
    return n ? parseInt(n) : 0
  }
  computedStyle(o) {
    return document.defaultView.getComputedStyle(o)
  }
  render() {
    return  (
      <div ref='userCenter' className='user-center'
           onTouchMove  = { this.handleMove.bind(this)  }
           onTouchStart = { this.handleStart.bind(this) }
           onTouchEnd   = { this.handleEnd.bind(this)   }
           onClick      = { this.handleClick.bind(this) }  >
        <Icon type={ require('./img/center.svg') } />
      </div>
    )
  }
}

export default Center
