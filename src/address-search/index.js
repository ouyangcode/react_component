import './style/index.scss'
import React, { Component } from 'react'
import { getStore } from '@boluome/common-lib'
import { clone, merge } from 'ramda'
import { List, WhiteSpace, InputItem, Button, Toast, Icon } from 'antd-mobile'
import Loading from '../loading'
import ic_loc from './img/zhuanche_start.png'
import ic_goback from './img/my_location.png'

const ListItem = List.Item

class AddressSearch extends Component {
  constructor(props) {
    super(props)
    let geoPoint = getStore('geopoint', 'session')
    const { longitude, latitude }   = this.props
    if(longitude && latitude) {
      geoPoint = merge(geoPoint, { longitude, latitude })
    }
    this.state = {
      geoPoint
    }
    this.mapContainer
    this.map
    console.log('this.state',this.state)
  }

  componentDidMount() {
      const { geoPoint } = this.state
      this.getGoLocation(geoPoint)
  }
  // 通过经纬度定位，联动
  getGoLocation(geoPoint) {
      const { Map, Point, Marker, Icon, Size, Geocoder, LocalSearch } = window.BMap
      let point = new Point(geoPoint.longitude, geoPoint.latitude)
      this.geoCoder    = new Geocoder()
      this.localSearch = new LocalSearch(point, { onSearchComplete: this.searchComplete.bind(this) })
      const map    = new Map(this.mapContainer)
      const marker = new Marker(point, { icon: new Icon(ic_loc, new Size(46, 77) ) })
      map.centerAndZoom(point, 26)
      map.addOverlay(marker)
      map.panTo(point)
      map.addEventListener('onmoving', () => {
          marker.setPosition(map.getCenter())
          this.getLocation(marker);console.log('marker',marker);
      });
      this.getLocation(marker)
      console.log('geoPoint-----',this.state)
  }

  getLocation(marker) {
    const closeLoading = Loading({ maskClosable: false, mask: false })
    this.geoCoder.getLocation(marker.getPosition(), (reply) => {console.log('woshisha=',reply)
      this.setState({ location: reply.surroundingPois });console.log('reply.surroundingPois',reply.surroundingPois)
      closeLoading()
    })
  }
  handleSearchAddr(keyWord) {console.log('开始搜索')
    this.localSearch.search(keyWord)
    this.setState({ keyWord })
    console.log('woshi ---state',this.state)
  }
  searchComplete(reply) {
    if(reply) {
      const searchResult = []
      for(let i = 0; i < reply.getCurrentNumPois(); i++) {
        searchResult.push(reply.getPoi(i))
      }
      this.setState({ searchResult })
    }
  }
  handleChooseAddress(local) {
    const { onSuccess, handleContainerClose } = this.props
    console.log('loc',local)

    onSuccess(local)
    handleContainerClose()
  }
  render() {
    const { searchResult = [], loading, location = [], keyWord = '' } = this.state

    return (
      <div>
        <div className='search-address-container'>
  				<div className='search'>
  					<input type = 'text' placeholder = '请输入地址' onChange = {({ target }) => this.handleSearchAddr(target.value) } />
  				</div>
          {
            keyWord.length > 0 ? (
              <div className='location-container pos-abs wp100' style={{ height: 'calc(100% - .95rem)', 'zIndex': '99', backgroundColor: '#fff' }}>
                {
                  searchResult.length === 0 ? (
                    <p style={ { textAlign: 'center', color: '#bfbfbf', boxSizing: 'border-box', padding: '.20rem 0' }}>没有结果</p>
                ) : searchResult.map((loc, idx) => (
                    <div className='location' onClick={ () => this.handleChooseAddress(loc) } key={ `location-search-result-${ idx }` }>
                      <div className='title'>{ loc.title }</div>
                      <div className='address'>{ loc.address }</div>
                    </div>
                  ))
                }
              </div>
            ) : ''
          }
        </div>
        <div className = "pak" ref={ node => this.mapContainer = node } style={{width: '100%', height: '40%', borderBottom: '1px solid #eee'}}></div>
        {
            keyWord.length > 0 ? '' : (<img className = "gobackLocation" src = { ic_goback } onClick = { () => {
                let geoPoints = getStore('geopoint', 'session')
                // geoPoints.longitude = getStore('goBackPoint','session').lng
                // geoPoints.latitude = getStore('goBackPoint','session').lat
                this.getGoLocation(geoPoints)
            }} />)
        }
        <div className='location-container touch-layer' style={{ height: 'calc(60% - .95rem)' }}>
          {
            location.map((loc, idx) => (
              <div className='location' onClick={ () => this.handleChooseAddress(loc) } key={ `location-result-${ idx }` }>
                <div className='title'>{ loc.title }</div>
                <div className='address'>{ loc.address }</div>
              </div>
            ))
          }
        </div>

      </div>
    )
  }
}

export default AddressSearch
