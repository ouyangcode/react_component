import './style/index.scss'
import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { merge, compose } from 'ramda'

const Mask = (content, options) => {
    const body = document.body
    const node = document.createElement('div')
    node.className += ' my-mask'      //暴露出一个class名，方便点击组件外dom，实现关闭当前遮罩
    const preventDefaul = e => e.preventDefault()
    const handleContainerClose = () => {
      unmountComponentAtNode(node)
      node.remove()
      document.documentElement.style.overflow = ''
    }

    document.documentElement.style.overflow = 'hidden'
    body.appendChild(node)
    render(
      <MaskContainer { ...{ handleContainerClose } } { ...options}>
        { React.cloneElement(content, { handleContainerClose }) }
      </MaskContainer>,
      node
    )
    return handleContainerClose
}

const localMaskContainerStyle = {}
const localMaskStyle = {}
const localContentStyle = {}
const defultMaskClick = () => {}

const bgWhite = { backgroundColor: '#000' }

// maskClick: 点击遮罩时触发的事件
const MaskContainer = ({ children, handleContainerClose, maskClick=defultMaskClick, mask = true, maskClosable = true, maskPosition = 'fixed', style = {}, maskStyle = {}, contentStyle }) =>
(
  <div className='mask-container' style={ merge(localMaskContainerStyle, style) }>
    <div className='mask'
         ref={ node => node && setTimeout(() => { node.className += ' fade-in' }, 50) }
         onClick={ maskClosable ? compose(handleContainerClose, maskClick) : '' }
         onTouchMove  = { e => e.preventDefault() }
         style={ !mask ? merge(localMaskStyle, maskStyle)
                       : compose(merge(localMaskStyle), merge(bgWhite))(maskStyle)
               } ></div>
    <div className='content' style={ merge(localContentStyle, contentStyle) }>
      { children }
    </div>
  </div>
)

export default Mask
