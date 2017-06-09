import './style/index.scss'
import React, { Component } from 'react'
import { List, WhiteSpace, InputItem, Switch, Picker, Radio, Button, Toast, Modal } from 'antd-mobile'
import SlidePage from '../slide-page'
import Mask from '../mask'
import Loading from '../loading'
import {  get, send, getStore, setStore } from '@boluome/common-lib'
import { clone, merge } from 'ramda'
import grayStar from './img/grayStar.png'
import grayStars from './img/grayStars.png'
import yellowStar from './img/yellowStar.png'
import yellowStars from './img/yellowStars.png'

class Evaluation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 5,
      defaultValue: this.props.defaultValue,
      width:this.props.width
    }
  }

  componentWillMount(props) {}

  render() {
    const { count, defaultValue, width } = this.state
    let grayArr = []
    let yellArr = []
    for (let i = 0; i < count; i++){
      grayArr.push(grayStar)
    }

    return (
      <div className='evaluationContainer'>
        <div className='grayStarBox'>
          <img src={ grayStars } style={{ width: width ? width : '' }} />
        </div>
        <div className='yellowStarBox' style={{ width: defaultValue }}>
          <img src={ yellowStars } style={{ width: width ? width : '' }} />
        </div>
      </div>
    )
  }
}

export default Evaluation
