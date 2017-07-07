import './style/index.scss'
import React from 'react'

let slidePageList = []

const closeSlidePage = slidePages => {
  if (slidePages.length > 0) {
    slidePages.shift().onclose()
    closeSlidePage(slidePages)
  }
}

const matchHashWithSlidePage = () => {
  closeSlidePage(slidePageList.filter(o => location.hash.indexOf(o.hash) < 0))
  refreshSlidePageList()
}
const refreshSlidePageList = () => {
  slidePageList = slidePageList.filter(o => location.hash.indexOf(o.hash) >= 0)
}

const SlidePage = ({ children, type = 'info', target = 'right', handleContainerClose, showHash = true, showClose = true, closeComponent, style }) => {
  const hash = Date.now()
  let node
  const onclose = () => {
    if (showHash) {
      const hash = node.getAttribute('data-id')
      if (location.hash.indexOf(hash) >= 0) history.go(-1)
    }
    node.className += ' hide'
    node.addEventListener("transitionend", () => {
      handleContainerClose()
      setTimeout(refreshSlidePageList, 0)
    })
  }

  const onload = _node => {
    if(_node) {
      node = _node
      if (showHash) {
        node.setAttribute('data-id', hash)
        location.hash += hash
        slidePageList.push({ node, hash, onclose })
      }
      setTimeout(() => {
        node.className = node.className.replace(' hide', '')
      }, 50)
    }
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

window.addEventListener('hashchange', () => {
  matchHashWithSlidePage()
}, false)

export default SlidePage
