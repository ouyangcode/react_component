import './style/index.scss'

import React from 'react'

const SlidePage = ({ children, type = 'info', target = 'right', handleContainerClose, showClose = true, onClose, closeComponent, style }) => {
  let node
  const onload = _node => {
    if(_node) {
      node = _node
      setTimeout(() => {
        node.className = node.className.replace(' hide', '')
      }, 50)
    }
  }
  const onclose = () => {
    node.className += ' hide'
    node.addEventListener("transitionend", () => {
      handleContainerClose()
    })
  }

  return (
    <div className={ `slide-page-container ${ target } ${ type } hide` }
         ref={ onload } style={ style } >

      { children && React.cloneElement(children, { handleContainerClose: onclose }) }
      {
        showClose && (
          <div className='close-container' onClick={ onclose } >
            { closeComponent ? (closeComponent) : <span className='slide-page-close'>+</span> }
          </div>
        )
      }
    </div>
  )
}

export default SlidePage
