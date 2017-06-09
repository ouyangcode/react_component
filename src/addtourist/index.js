import './style/index.scss'

import React from 'react'
import { setStore ,getStore, get, send } from '@boluome/common-lib'
import moment from 'moment'
import { clone, merge } from 'ramda'
import { Calendar } from "@boluome/oto_saas_web_app_component"
import { List , InputItem , Picker , WhiteSpace ,DatePicker ,Accordion ,Toast } from "antd-mobile"

import Loading       from '../loading'

const Item = List.Item

class AddTourist extends React.Component{
  constructor(props){
    super(props)
    const { editContact } = props
    console.log('editContact-----',editContact);
    this.edit = false
    if(editContact && editContact.id) {
      this.state = {
        ...editContact
      }
      this.edit = true
    } else {
      this.state = {
        id	      : '',
        type      : 1,
        cardType  : '身份证',
        name      : '',
        phone     : '',
        idCard    : '',
        status    : '',
        identityId: '',
        isDefault : false
      }
    }
    this.handleToggleContactForm = this.handleToggleContactForm.bind(this)
    this.handleTypeChange = this.handleTypeChange.bind(this)
    this.handlePhoneChange = this.handlePhoneChange.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleIdCardChange = this.handleIdCardChange.bind(this)
    this.handleSaveTourist = this.handleSaveTourist.bind(this)
    this.handBornDateChange = this.handBornDateChange.bind(this)
    this.handleSuccess = this.handleSuccess.bind(this)
  }
  handleToggleContactForm(bContactFormShow) {
    this.setState({ bContactFormShow })
  }
  handleTypeChange(typeText) {
    if(typeText == 1){
         this.setState({ type : 1 })
    }else if(typeText == 2){
         this.setState({ type : 2 })
    }else if(typeText == 3){
         this.setState({ type : 3 })
    }
  }
  handlePhoneChange(phone) {
    this.setState({ phone })
  }
  handleNameChange(name) {
    this.setState({ name })
    // console.log('name', name);
  }
  handBornDateChange(bornDate){
     let bornDates = moment(bornDate ).format('YYYY-MM-DD');
     this.setState({ bornDate : bornDates})
  }
  handleIdCardChange(idCard) {
      let birthday = "";
        if(idCard != null && idCard != ""){
            if(idCard.length == 15){
                birthday = "19"+idCard.substr(6,6);
            } else if(idCard.length == 18){
                birthday = idCard.substr(6,8);
            }

            birthday = birthday.replace(/(.{4})(.{2})/,"$1-$2-");
        }

    setStore('birthday',birthday,'session')
    this.setState({ idCard })
    this.setState({ bornDate : birthday });
  }
  handleSaveTourist() {
      const { id, type, phone, name, bornDate , cardType, idCard, status, identityId , isDefault } = this.state
      const { onSuccess } = this.props
      if(!name) {
        Toast.info('请填写姓名')
        return
      }
      console.log('phone', phone);
      if(!(/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/.test(phone))) {
        Toast.info('请填写正确手机')
        return
      }
      if(!cardType) {
        Toast.info('请选择证件类型')
        return
      }
      if(!idCard) {
        Toast.info('请填写证件号码')
        return
      }
      if(!bornDate) {
        Toast.info('请填选择出生日期')
        return
      }
      let birthday = getStore('birthday' ,'session');console.log('bornDate----',bornDate,'birthday----',birthday);
      if(bornDate != birthday){
          Toast.info('证件号码错误')
          return
      }
      let postData = {}
      if(id) {
        postData = clone(this.state)
    } else {
        postData = merge(this.state, {
         ...getStore('geopoint', 'session'),
         userId: getStore('customerUserId', 'session')
       })
      }

      delete postData.districts
      delete postData.bAddressSearchShow

      const handleClose = Loading()
      send('/user/v1/identity', postData, id ? 'put' : 'post')
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
  componentDidMount() {
      // const { geoPoint } = this.state
      // this.handleDatefn()
  }
  render(){
      const seasons = [
            {
              label: '身份证',
              value: '身份证',
            },
            {
              label: '护照',
              value: '护照',
            },

        ];
        const date1= new Date();
        const maxDate = moment(date1, 'YYYY-MM-DD');
        const minDate = moment('1900-01-01', 'YYYY-MM-DD');
        console.log('seasons',seasons);
        // 如果是修改常用旅客信息
        const { id, type, phone, name, bornDate , cardType, idCard, status, identityId , isDefault } = this.state
        // const { editContact={} } = this.props
        // const {  id='', type='', phone='', name='',  cardType='', idCard='', status='', identityId='' , isDefault=''  } = editContact
        // const { bornDate } = this.state
        console.log('bornDate1111111',bornDate);
      return (
        <div className = "addtouristWrap">
           <div className = "addtouristMain">
              <List>
                  <Item>
                      <span className = "addtitle">类型</span>
                      <span className = { type == 1 ? 'add_oto oto_span' :'add_oto ' } onClick = { () => { this.handleTypeChange(1) }} >成人</span>
                      <span className = { type == 2 ? 'add_oto oto_span' :'add_oto ' } onClick = { () => { this.handleTypeChange(2) }}>儿童</span>
                      <span className = { type == 3 ? 'add_oto oto_span' :'add_oto ' } onClick = { () => { this.handleTypeChange(3) }}>婴儿</span>
                  </Item>
                  <InputItem className = "oto_int"
                    type="text"
                    placeholder="请输入姓名"
                    defaultValue={ name }
                    onChange={ this.handleNameChange }
                  >姓名</InputItem>
                  <InputItem className = "oto_int"
                    type="number"
                    placeholder="请输入手机号"
                    defaultValue={ phone }
                    onChange={ this.handlePhoneChange }
                    maxLength='11'
                  >手机号码</InputItem>
                  <Picker
                    data={seasons}
                    title="证件类型"
                    extra={ cardType ? cardType : '身份证' }
                    cols='1'
                    value={this.state.dpValue}
                    onChange={v => this.setState({ dpValue: v })}
                  >
                  <Item className = "card" arrow="horizontal">证件类型</Item>
                  </Picker>
                  <InputItem className = "oto_int"
                    type="text"
                    placeholder="请输入证件号码"
                    defaultValue={ idCard }
                    onChange={ this.handleIdCardChange }
                    maxLength='18'
                  >证件号码</InputItem>
                  <DatePicker
                  mode="date"
                  title="出生年月"
                  format={ val => val.format('YYYY-MM-DD') }
                  value={ moment(bornDate ? bornDate : minDate) }
                  onChange={ v =>  this.handBornDateChange( v ) }
                  maxDate = {maxDate}
                  minDate = {minDate}
                  >
                    <List.Item arrow="horizontal" className = "born">出生年月</List.Item>
                  </DatePicker>
              </List>
                <div className = "SaveBtn" onClick = { () => this.handleSaveTourist() }>保存</div>
           </div>
        </div>
      )
  }
}


export default AddTourist
