import React, { Component } from 'react';
import { get, send, getStore } from '@boluome/common-lib'
import { merge, clone } from 'ramda'
import './style/index.scss'

const { BMap = '' } = window
class MapShow extends Component{
  constructor(props) {
    super(props)
    let geoPoint = getStore('geopoint', 'session')
    const { longitude, latitude, addrnameStr, addrTitlename, translateFrom }   = this.props
    // const scale = window.devicePixelRatio  // 部分安卓机上没有这个
    const bodyfontSize = document.documentElement.style.fontSize
    let scale = window.viewportScale
    if (bodyfontSize === '50px' && scale === 1) {
      scale = 1
    }
    if(longitude && latitude) {
      geoPoint = merge(geoPoint, { longitude, latitude })
    }
    this.state = {
      geoPoint,
      addrnameStr,
      addrTitlename,
      scale,
    }
    if (translateFrom) {
      const callback = point => {
        this.setState({
          geoPoint: point,
        })
      }
      this.transformPoint(geoPoint, callback, translateFrom)
    }
    this.mapContainer
    this.map
    this.transformPoint = this.transformPoint.bind(this)
  }
  componentDidMount() {
    const { geoPoint } = this.state
    this.handleMapfn(geoPoint)
  }
  transformPoint(geoPoint, callback, from, to) {
    if (BMap) {
      const { longitude, latitude } = geoPoint
      const { Convertor, Point } = BMap
      const convertor  = new Convertor()
      const baiduPoint = new Point(longitude, latitude)
      convertor.translate([baiduPoint], from, to, ({ points }) => {
        if (Array.isArray(points) && points.length > 0) {
          const { lat, lng } = points[0]
          callback({ latitude: lat, longitude: lng })
        }
      })
    } else {
      callback('no BMap')
    }
  }
  handleMapfn(geoPoint) {
    const { Point } = window.BMap
    const { addrnameStr } = this.state
    let { addrTitlename } = this.state
    addrTitlename = `<span class="iw_poi_img"></span><span class='iw_poi_title'>${ addrTitlename }</span>`
    const opts = {
      width:              200,
      height:             0,
      title:              addrTitlename,
      enableCloseOnClick: false,
    }
    const str = `<div class="iw_poi_content">地址：${ addrnameStr }</div>`
    const mapContainer = document.querySelector('.pak')
    const map = new BMap.Map(mapContainer)
    const point = new Point(geoPoint.longitude, geoPoint.latitude)
    const marker = new BMap.Marker(point)
    const iw = new BMap.InfoWindow(str, opts)

    map.centerAndZoom(point, 16)
    // map.disableDragging() // 禁止拖拽
    map.disableDoubleClickZoom()  // 禁止双击放大
    // map.disablePinchToZoom() // 禁止手指缩放
    map.addOverlay(marker)
    map.addEventListener('onclick', () => {
      marker.openInfoWindow(iw, point)
    })
    map.addEventListener('onmoving', () => {
      // marker.setPosition(map.getCenter())
      document.querySelector('.pak').style.overflow = 'visible'
    })
    marker.addEventListener('oninfowindowopen', () => {
      const ratio = window.viewportScale
      const titleEl = document.querySelector('.BMap_bubble_title')
      const iconEl = document.querySelector('.iw_poi_img')
      const contentEl = document.querySelector('.iw_poi_content')
      if (iconEl) {
        iconEl.style.width = `${ 0.4 / ratio }rem`
        iconEl.style.height = `${ 0.4 / ratio }rem`
      }
      if (titleEl) {
        titleEl.style.fontSize = `${ 0.30 / ratio }rem`
        titleEl.style.padding = `${ 0.15 / ratio }rem ${ 0.05 / ratio }rem`
      }
      if (contentEl) {
        contentEl.style.fontSize = `${ 0.28 / ratio }rem`
      }
    })
    marker.openInfoWindow(iw, point)
  }
  render() {
    const { scale } = this.state
    // 百度地图API功能
    return (
      <div className='addrBumapWrap'>
        <div className='addrBumapMain'>
          {
            <div className='pak' ref={ node => {
              if (node) {
                node.style.width = `${ window.screen.width }px`
                node.style.height = `${ window.screen.height }px`
                node.style.overflow = 'hidden'
                node.style.transform = `scale(${ scale }, ${ scale })`
                node.style.transformOrigin = 'top left'

                node.style.WebkitTransform = `scale(${ scale }, ${ scale })`
                node.style.WebkitTransformOrigin = 'top left'
                const { geoPoint } = this.state
                this.handleMapfn(geoPoint)
              }
            } }
              style={{ borderBottom: '1px solid #eee' }}
            />
          }
        </div>
      </div>
    )
  }
}

export default MapShow
