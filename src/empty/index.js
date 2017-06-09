import './index.scss'
import React, { Component } from 'react'
import SlidePage from '../slide-page'
import Mask      from '../mask'
import Loading   from '../loading'
import { Icon } from 'antd-mobile'


class Empty extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentWillMount(props) {}

  handleImgLoaded() {
    const { content } = this.refs
    // console.log(content)
    const h  = parseInt(document.defaultView.getComputedStyle(content).height)
    const dh = parseInt(document.defaultView.getComputedStyle(document.body, null).height)
    content.style.top = (dh - h) / 2 + 'px'
  }
  render() {
    const { imgUrl, title, message, button } = this.props

    // console.log(imgUrl);
    // let reg = new RegExp(/\./g)

    return (
      <div className='empty-container'>
        <div className='empty-content' ref='content'>
          {
            imgUrl.constructor == String
            ? <img src={ imgUrl } onLoad={ () => this.handleImgLoaded() }/>
            : imgUrl
          }
          {
            title ? <h3 className='title'>{ title }</h3> : ''
          }
          <p className='message' >{ message }</p>
          {
            button ? button : ''
          }
        </div>
      </div>
    )
  }
}

export default Empty
