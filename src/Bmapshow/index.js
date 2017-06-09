import React, { Component } from 'react';
import { get, send, getStore } from '@boluome/common-lib'
import { merge, clone } from 'ramda'
import './style/index.scss'

const { BMap = '' } = window
class Bmapshow extends Component{
  constructor(props) {
    super(props)
    let geoPoint = getStore('geopoint', 'session')
    const { longitude, latitude, addrnameStr, addrTitlename }   = this.props
    if(longitude && latitude) {
      geoPoint = merge(geoPoint, { longitude, latitude })
    }
    this.state = {
      geoPoint,
      addrnameStr,
      addrTitlename,
    }
    this.mapContainer
    this.map
    console.log('this.state',this.state)
  }
  componentDidMount() {
    const { geoPoint } = this.state
    this.handleMapfn(geoPoint)
    console.log(geoPoint)
  }
  handleMapfn(geoPoint) {
    const { Point } = window.BMap
    const { addrnameStr } = this.state
    let { addrTitlename } = this.state
    addrTitlename = `<span class="iw_poi_img"></span>${ addrTitlename }`
    const map = new BMap.Map(this.mapContainer)
    const point = new Point(geoPoint.longitude, geoPoint.latitude)
    map.centerAndZoom(point, 18)
    const marker = new BMap.Marker(point)
    map.addOverlay(marker)
    const opts = {
      minWidth: 500,
      Height:   'auto',
      title:    addrTitlename,
    }
    // const str = `<div class="iw_poi_content">地址：${ addrnameStr }<span class="iw_poi_warp" onclick="(${ this.handleCopyData })()"><span class="iw_poi_copy">复制粘贴</span><span class="iw_poi_img"></span></span></div>`
    const str = `<div class="iw_poi_content">地址：${ addrnameStr }</div>`
    const iw = new BMap.InfoWindow(str, opts)
    map.openInfoWindow(iw, point)
    console.log('map-----', addrnameStr, addrTitlename)
  }
  render() {
    // 百度地图API功能
    return (
      <div className='addrBumapWrap'>
        <div className='addrBumapMain'>
          <div className='pak' ref={ node => this.mapContainer = node } style={{ width: '100%', height: '100%', borderBottom: '1px solid #eee' }} />
        </div>
      </div>
    )
  }
}

export default Bmapshow
