import React, { Component } from 'react'
import { setStore ,getStore, get, send } from '@boluome/common-lib'
import { clone, merge } from 'ramda'
import { List, WhiteSpace, InputItem, Switch, Picker, Radio, Button, Toast } from 'antd-mobile'
import Loading       from '../loading'
import AddressSearch from '../address-search'
import SlidePage     from '../slide-page'
import Mask          from '../mask'
import './style/contact-form.scss'
import chooseIcon   from './img/choose.png'
import nochooseIcon from './img/nochoose.png'

const ListItem = List.Item

// 百度根据城市名获取坐标
const baiduGetLocation = (cityName, callback) => {
    console.log('cityName----', cityName)
    var myGeo = new BMap.Geocoder();	//构造函数
    myGeo.getPoint(cityName,function(point){
        callback(point)
    })
}
// 改变逆向城市名称
const gethasLocation = ( mPoint, callback ) => {
    var myGeo = new BMap.Geocoder();
    myGeo.getLocation(mPoint,
        function mCallback(rs){
            console.log('rs-----', rs);// 这里的区参数是district，在2017-6-30 修改，
            let rightCity = rs.addressComponents;
            callback(rightCity)
        }
    );
}

class CustomerForm extends Component {
  constructor(props) {
    super(props)
    const { editContact } = props
    this.edit = false
    if(editContact && editContact.contactId) {
      this.state = {
        ...editContact,
        focus: true,
      }
      this.edit = true
    } else {
      this.state = {
        contactId	: '',
        gender:      0,
        phone :      '',
        name  :      '',
        detail:      '',
        address:     '',
        tag    :     '',
        isDefault:   false,
        houseNum:    '',
      }
    }
    // this.provinceArr = []
    // this.cityArr   = []
    // this.countyArr = []

    console.log(editContact);
  }
  handleToggleContactForm(bContactFormShow) {
    this.setState({ bContactFormShow })
  }
  handleGenderChange(gender) {
    this.setState({ gender })
  }
  handlePhoneChange(phone) {
    this.setState({ phone })
  }
  handleNameChange(name) {
    this.setState({ name })
  }houseNum
  handleHouseNumChange(houseNum) {
    this.setState({ houseNum })
  }
  handleAddrDetailChange(detail) { // console.log('handleAddrDetailChange---=',detail)
    this.setState({ detail })
  }
  handleAddressChange(location) { // console.log('handleAddressChange---=',location)
    const { point, title, address } = location
    console.log('handleAddressChange----gethasLocation---', location, point)
    gethasLocation( point , rightCity => { console.log('rightCity',rightCity)
        this.handleChangeArea(rightCity.province , rightCity.city, rightCity.district , true); // rightCity.county 因为没有这个参数了 而被替换为district  所以这里做了修改 2017-7-30
        const { city, province, district  } = rightCity
        this.setState({
          province,
          city,
          county: district,
        })
    })
    this.setState({
        longitude: point.lng,
        latitude : point.lat,
        address  : title,
    })
    const points = {
      longitude: point.lng,
      latitude : point.lat,
    }
    setStore('goBackPoint',points , 'session'); // 经纬度精确问题 2017-7-06  外卖
    //this.handleToggleAddressSearchShow(false)
    this.handleAddrDetailChange(address)
    // this.setState({ address })
  }

  handleTagChange(tag) {
    if(tag === '无') tag = ''
    console.log('this-----', this);
    this.setState({ tag })
  }
  // handleTagsChange(tag) {
  //   if(tag === '无') tag = ''
  //   this.setState({ tag })
  // }
  handleDefaultChange(isDefault) {
    this.setState({ isDefault })
  }
  handleSaveContact() {
    const { contactId, gender, phone, name, detail, address, tag, isDefault, houseNum } = this.state
    const { onSuccess } = this.props
    if(!name) {
      Toast.info('请填写姓名')
      return
    }
    if(!(/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/.test(phone))) {
      Toast.info('请填写正确手机')
      return
    }
    if(!address) {
      Toast.info('请选择地址')
      return
    }
    if(!detail) {
      Toast.info('请填写详细地址')
      return
    }
    if(!houseNum) {
      // Toast.info('请填写门牌号')
    }
    let postData = {}
    if (contactId) {
      postData = clone(this.state)
    } else {
      postData = merge(this.state, {
       ...getStore('goBackPoint', 'session'), // 2017-7-03 修改保存时的经纬度，原本为取用本地的经纬度
       userId: getStore('customerUserId', 'session')
     })
     console.log('SaveContact-----', getStore('goBackPoint', 'session'))
    }

    delete postData.districts
    delete postData.bAddressSearchShow

    const handleClose = Loading()
    send('/user/v1/contact', postData, contactId ? 'put' : 'post')
    .then(({ code, data, message }) => {
      if(code === 0) {
        this.handleSuccess()
      } else {
        console.log(message)
      }
      handleClose()
    })
  }
  handleSuccess() {
    const { onSuccess, handleContainerClose } = this.props
    onSuccess()
    handleContainerClose()
  }
  componentWillMount() {
    this.fetchAreas()
  }
  componentWillReceiveProps() {
      this.fetchAreas()
  }
  // filterAreaById (province, city, county) {
  //   const { provinceArr, cityArr, countyArr } = this.state
  //   //let arr = []
  //
  //   districts.reduce((arr, current) => {
  //
  //   })
  // }
  fetchAreas () {
    const handleClose = Loading()
    get('/basis/v1/areas')
    .then(({ code, data, message }) => {
      if(code === 0) {
        this.setState({
          districts: data.map(({ id, name, city }) => {
            return {
              value: id,
              label: name,
              children: city.map(({ id, name, county }) => {
                return {
                  value: id,
                  label: name,
                  children: county.map(({ id, name }) => {
                    return {
                      value: id,
                      label: name
                    }
                  })
                }
              } )
            }
          })
        })
        if(!this.edit) {
          const { province = '', city = '', district = '' } = getStore('currentPosition', 'session') || {}
            this.handleChangeArea(province, city, district)
        }else{
            console.log('我换地方了')
        }
      } else {
        console.log(message)
      }
      handleClose()
    })
  }
  handleChangeArea(province, city, county ,mark) {
    // console.log('handleChangeArea------', province, city, county ,mark);
    const { districts = [] } = this.state
    console.log('districts---', districts);
    let provinceObj = districts.filter(d => province === d.label || province === d.value)[0] || {}
    let cityObj
    let countyObj

    if(provinceObj && provinceObj.children) {
      cityObj = provinceObj.children.filter(c => city === c.label || city === c.value)[0] || {}
    }
    if(cityObj && cityObj.children) {
      countyObj = cityObj.children.filter(c => county === c.label || county === c.value)[0] || {}
    }
    if(countyObj && !countyObj.value && cityObj.children) {
      countyObj = cityObj.children[0]
    }
    if(provinceObj && cityObj && countyObj) {
        // console.log('provinceObj && cityObj && countyObj----', provinceObj.label + cityObj.label  +countyObj.label);
        baiduGetLocation(`${ provinceObj.label }${cityObj.label}${countyObj.label}`, point => {
            console.log('point--baiduGetLocation', point)
            this.setState({
                latitude: point ? point.lat : '',
                longitude: point ? point.lng : '',
            })
            if(mark){
                 console.log('我是逆向选择');
            }else{
                this.setState({
                    detail: '',
                    address: ''
                })
            }
            // setStore('goBackPoint',point , 'session') // 经纬度精确问题 2017-7-06  外卖  搜索回来经纬度不对
        });
        this.setState({
          province  : provinceObj.label,
          provinceId: provinceObj.value,
          city    : cityObj.label,
          cityId  : cityObj.value,
          county  : countyObj.label,
          countyId: countyObj.value
        })
    } else {
      Toast.fail('请先定位')
    }

  }
  handleToggleAddressSearchShow () {
    const { longitude, latitude, address } = this.state

    Mask(
      <SlidePage target='right' type='root' >
        <AddressSearch { ...{ address, longitude, latitude } }
                       onSuccess={ this.handleAddressChange.bind(this) } />
      </SlidePage>,
      { mask: false, style: { position: 'absolute' } }
    )
  }
  render() {
    const { gender, phone, name, detail, address, tag, isDefault, loading, bAddressSearchShow, longitude, latitude, districts, contatId,
            houseNum, province = '', city = '', county = '', provinceId, cityId, countyId } = this.state
    //console.log(provinceId, cityId, countyId)
    return (
      <div className='touch-layer hp100 contactWrap'>
        <List>
          <ListItem>
            <div className='tcenter black font-x'>{ this.edit ? '编辑' : '新增' }收货地址</div>
          </ListItem>
        </List>
        <WhiteSpace size='lg' />
        <List>
          <ListItem className = "am-list-name" >
            <span className='wp20 inline-block'>收货人</span>
            <span>
              <input type='text' placeholder='请填写收货人的姓名' value={ name }
                onChange={ e => this.handleNameChange(e.target.value) }
                className='wp80 no-border'
              />
            </span>
          </ListItem>
          <ListItem>
            <div className='sixLable'>
              <span className={ `gray ${ gender === 0 ? 'otoOrange' : '' }` } onClick={ () => this.handleGenderChange(0) }>先生</span>
              <span className={ `gray ${ gender === 1 ? 'otoOrange' : '' }` } onClick={ () => this.handleGenderChange(1) }>女士</span>
            </div>
          </ListItem>
          <ListItem>
            <span className='wp20 inline-block'>手机号</span>
            <span>
              <input type='tel' maxLength='11' placeholder='请填写收货人的电话号码' value={ phone }
                onChange={ e => this.handlePhoneChange(e.target.value) }
                className='wp80 no-border'
              />
            </span>
          </ListItem>
          <Picker extra={ `${ province } ${ city } ${ county }` }
                  value={[ provinceId, cityId, countyId ]} format={ val => val.join(' ') }
                  data={ districts } onChange={ val => this.handleChangeArea(val[0], val[1], val[2]) } cols='3'>
            <ListItem className = "am-list-point" arrow='horizontal' >所在地区</ListItem>
          </Picker>
          <ListItem>
            <span className='wp20 inline-block'>配送至</span>
            <span className={ `wp80 no-border addressSpan ${ address ? 'addressSpan0' : '' }` } onClick={ () => { this.handleToggleAddressSearchShow(true) } }>
              { `${ address ? address : '请填写小区/写字楼/学校等' }` }
            </span>
          </ListItem>
          <ListItem>
            <span className='wp20 inline-block'></span>
            <span>
              <input type='text' placeholder='补充详细地址（如门牌号/楼层等）' value={ detail }
                className='wp80 no-border'
                onChange={ e => this.handleAddrDetailChange(e.target.value) }
              />
            </span>
          </ListItem>
          <ListItem>
            <span className='wp20 inline-block'>门牌号</span>
            <span>
              <input type='text' placeholder='例：6号楼205室' value={ houseNum }
                onChange={ e => this.handleHouseNumChange(e.target.value) }
                className='wp80 no-border'
              />
            </span>
          </ListItem>
          <ListItem className='tagList' extra={

                ['家', '公司', '学校'].map((d, i) => (
                  <span className={ `tag ototab ${ tag && tag === d ? 'otoOrange' : '' }` } key={ i } onClick={ () => this.handleTagChange(d) }>{ d }</span>
                ))
          } arrow='empty' >标签</ListItem>
        </List>
        <WhiteSpace size='lg' />
        <List style={{ display: 'none' }}>
          <ListItem extra={ <Switch checked={ !!isDefault } onChange={ checked => this.handleDefaultChange(checked) } /> }>
            是否设为默认地址
          </ListItem>
        </List>
        <div className='pd16'>
          <button className='btn wp100 primary' onClick={ () => this.handleSaveContact() }>保存</button>
        </div>
      </div>
    )
  }
}

const iconStyle = {
  height: '.36rem', width: '.36rem', margin: '-.06rem .06rem 0 0'
}
// 标签组件
const LabelComponent = ({ handleTagChange, tag }) => {
  const data = ['家', '公司', '学校']
  // .map(d => { return { value: d, label: d } }) } onChange={ val => this.handleTagChange(val[0]) } cols='1'>
  return (
    <div>
      {
        data.map((d, i) => (
          <span className={ `tag ototab${ tag && tag === d ? 'otoOrange' : '' }` } key={ i } onClick={ handleTagChange(d) }>{ d }</span>
        ))
      }
    </div>
  )
}
export default CustomerForm
