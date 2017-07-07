import './style/index.scss'
import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { merge, compose } from 'ramda'

const MaskList = []

const Mask = (content, options) => {
    const body = document.body
    const node = document.createElement('div')

    const preventDefaul = e => e.preventDefault()
    const handleContainerClose = () => {
      if (unmountComponentAtNode(node)) node.remove()
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
    }

    MaskList.push(handleContainerClose)

    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    body.appendChild(node)

    render(
      <MaskContainer { ...{ handleContainerClose } } { ...options}>
        { React.cloneElement(content, { handleContainerClose }) }
      </MaskContainer>,
      node
    )
    return handleContainerClose
}

Mask.__proto__.closeAll = () => {
  if (MaskList.length > 0) {
    setTimeout(MaskList.shift(), 0)
    Mask.closeAll()
    location.hash = ''
  }
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
