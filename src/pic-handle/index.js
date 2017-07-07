import './style/index.scss'

import React, { Component } from 'react';
import { get, send } from '@boluome/common-lib'
import { moment, addInterval } from '@boluome/common-lib'
import { compose, ifElse, __, always, gte } from 'ramda'

class PicHandle extends Component {
  constructor(props){
    super(props)
    // console.log('props==pic',props);
    const { picSrc, sw, sh } = props
    let imgw = '200'//sw
    let imgh = '300'//sh
    this.state = {
       picSrc,
       sh,
       sw,
       imgh,
       imgw,
       marginLeft: 0,
       marginTop: 0
    }
    this.setImgSize(picSrc, sw, sh, imgw, imgh)
    this.resetImgSizeWH = this.resetImgSizeWH.bind(this)
  }
  setImgSize(picSrc, sw, sh, imgw, imgh){
    const image = new Image()
    const that = this
    image.src = picSrc
    // console.log('image', image);
    let w
    let h
    image.onload = function(){
      w = image.width
      h = image.height
      that.resetImgSizeWH(picSrc, w,h,sw,sh, imgw, imgh)
    }
  }
  componentWillMount () {
    const { picSrc, sw, sh } = this.props
    this.setImgSize(picSrc, sw, sh, '200', '100')
  }
  componentWillReceiveProps(nextProps) {
    const { sw, sh }   = nextProps
    this.setState({
      sw,
      sh,
    })
  }
  resetImgSizeWH(picSrc, w,h,sw,sh, imgw, imgh){
    const swh = sw/sh
    const wh = w/h
    let marginLeft
    let marginTop
    const bodyfontSize = document.documentElement.style.fontSize
    const viewportScale = window.viewportScale;
    let bi = parseInt(bodyfontSize) / 100;
    if (bodyfontSize === '50px' && viewportScale === 1) {
        bi = 1;
        imgh = sh * 1.2;
        imgw = sw * 1.5;
        marginLeft = -(imgw - sw) / 2
        marginTop = -(imgh - sh) / 2
        // console.log('imgh', imgh, 'imgw', imgw, 'sh', sh, 'sw', sw)
        // console.log(marginLeft)
    } else {
      if (swh > wh) { // alert('if')
        imgw = sw
        imgh = imgw/w * h
        imgh = imgh * bi
        imgw = imgw * bi
      } else if (swh < wh) { // alert('else if')
        imgh = sh
        imgw = imgh/h * w
        imgh = imgh * bi
        imgw = imgw * bi
        marginLeft = -(imgw/bi - sw) / 2
        marginTop = -(imgh/bi - sh) / 2
      } else {
        imgh = h;
        imgw = w;
      }
      marginTop = 0;
    }
    // if (bodyfontSize === '50px' && viewportScale === 1) {
    //     marginLeft = 0;
    // }
    this.setState({
      imgh,
      imgw,
      marginLeft,
      marginTop,
    })
  }
  render(){
    const { picSrc, sw, sh, imgw, imgh, marginTop, marginLeft } = this.state
      return (
        <div className='picHandleWrap'>
            <div className='picItem'>
              <img alt='' src={ picSrc } style={{ width: imgw + 'px', height: imgh + 'px', marginTop, marginLeft }} />
            </div>
        </div>
      )


  }



}
export default PicHandle
