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
        type      : 0,
        bornDate  : '',
        cardType  : '',
        name      : '',
        phone     : '',
        idCard    : '',
        status    : '',
        identityId: '',
        isDefault : false
      }
    }
  }
  handleToggleContactForm(bContactFormShow) {
    this.setState({ bContactFormShow })
  }
  handleTypeChange(type) {
    this.setState({ type })
  }
  handlePhoneChange(phone) {
    this.setState({ phone })
  }
  handleNameChange(name) {
    this.setState({ name })
  }
  handBornDateChange(bornDate){
     this.setState({ bornDate })
  }
  handleIdCardChange(idCard) { console.log('handleidCardChange---=',idCard)
      let birthday = "";
        if(idCard != null && idCard != ""){
            if(idCard.length == 15){
                birthday = "19"+idCard.substr(6,6);
            } else if(idCard.length == 18){
                birthday = idCard.substr(6,8);
            }

            birthday = birthday.replace(/(.{4})(.{2})/,"$1-$2-");
        }

        // return birthday;
        console.log('birthday---',birthday);
    this.setState({ idCard })
    this.handBornDateChange( birthday )
  }
  handleSaveTourist() {
      const { id, type, phone, name, bornDate , cardType, idCard, status, identityId , isDefault } = this.state
      const { onSuccess } = this.props
      if(!name) {
        Toast.info('请填写姓名')
        return
      }
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
          [
            {
              label: '身份证',
              value: '身份证',
            },
            {
              label: '护照',
              value: '护照',
            },
          ]
        ];
        const maxDate = moment('2016-12-03 +0800', 'YYYY-MM-DD Z').utcOffset(8);
        const minDate = moment('2015-08-06 +0800', 'YYYY-MM-DD Z').utcOffset(8);

        // 如果是修改常用旅客信息
        const { id, type, phone, name, bornDate , cardType, idCard, status, identityId , isDefault } = this.state
      return (
        <div className = "addtouristWrap">
           <div className = "addtouristMain">
              <List>
                  <Item>
                      <span className = "addtitle">类型</span>
                      <span className = "add_oto">成人</span>
                      <span className = "add_oto">儿童</span>
                      <span className = "add_oto">婴儿</span>
                  </Item>
                  <Item>
                      <span className='wp30 inline-block'>姓名</span>
                      <span><input type='text' placeholder='请输入姓名' value={ name } onChange={ e => this.handleNameChange(e.target.value) } className='wp70 no-border' /></span>
                  </Item>
                  <Item>
                      <span className='wp30 inline-block'>手机号</span>
                      <span><input type='tel' maxLength='11' placeholder='请输入手机号' value={ phone } onChange={ e => this.handlePhoneChange(e.target.value) } className='wp70 no-border' /></span>
                  </Item>
                  <Picker
                    data={seasons}
                    title="证件类型"
                    extra={ cardType ? cardType :'身份证' }
                    cols = '1'
                    value={this.state.dpValue}
                    onChange={v => this.setState({ dpValue: v })}
                  >
                  <Item className = "card" arrow="horizontal">证件类型</Item>
                  </Picker>
                  <Item>
                      <span className='wp30 inline-block'>证件号码</span>
                      <span><input type='number' maxLength='19' placeholder='请输入证件号码' value={ idCard } onChange={ e => this.handleIdCardChange(e.target.value) } className='wp70 no-border' /></span>
                  </Item>
                  <DatePicker
                    mode="date"
                    title="出生年月"
                    extra={ bornDate ? bornDate :'1990-01-01' }
                    value={this.state.dpValue}
                    format={(values) => { return values.join(',')}}
                    minDate={minDate}
                    maxDate={maxDate}
                    onChange={v => this.handBornDateChange( v )}
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
