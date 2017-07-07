import './style/index.scss'

import React from 'react'
import { merge, always, equals, type, compose, when } from 'ramda'
import Mask from '../mask'
import img_loading from './img/cc.gif'
import Linear from './linear'

let localStyle = {}

let localImgStyle = {}

const LoadingComponent = ({ component, imgSrc = img_loading, style, imgStyle }) => {
  localStyle = when(compose(equals('Object'), type),
                    always(merge(localStyle, { backgroundColor: 'transparent', textAlign: 'center'}))
                   )(component)

  return (
    <div className='loading-container' style = { merge(localStyle, style) }>
  		{
        component ? component : (<img src={ imgSrc } style={ merge(localImgStyle, imgStyle) } />)
      }
  	</div>
  )
}

const Loading = (options = { maskClosable: false, mask: false }) => Mask(<LoadingComponent { ...options }  />, options)

export default Loading

// <Linear />
// <img src={ imgSrc } style={ merge(localImgStyle, imgStyle) } />
