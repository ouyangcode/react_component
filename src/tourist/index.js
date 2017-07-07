import './style/index.scss'
import React, { Component } from 'react'
import { get, send, setStore, getStore } from '@boluome/common-lib'
import { List, WhiteSpace, Icon, SwipeAction, Flex, Modal ,Checkbox }    from 'antd-mobile'
import { AddTourist } from '@boluome/oto_saas_web_app_component'
import SlidePage from '../slide-page'
import Mask      from '../mask'
import Loading   from '../loading'

import ContactForm from '../contact-form'
import add_src   from './img/ic_add.png'
import gou_src   from './img/ic_gou.png'
import ic_suc from './img/ic_suc.svg'
import ic_delete from './img/ic_delete.svg'
import ic_edit from './img/ic_edit.svg'
import ic_noChoose from './img/ic_noChoose.svg'
import ic_set from './img/ic_set.svg'
import { merge, clone } from 'ramda'

const ListItem = List.Item
const FlexItem = Flex.Item
const alert = Modal.alert
let closealert = ''

class Tourist extends Component {
    constructor(props) {
      super(props)
      this.state = {
        contactList: [],
        bContactFormShow: false,
        editContact: {},
        userId :getStore('customerUserId', 'session')
      }
    }
    fetchContact() {
      const handleClose = Loading()
      let userId = getStore('customerUserId', 'session');console.log('userId---',userId);
      get('/user/v1/identities', { userId })
      .then(({ code, data, message }) => {
        // code = 0
        // data = [{"name":"tst","phone":"13812345678","gender":0,"longitude":121.48789949,"latitude":31.24916171,"province":"上海市","provinceId":"310000","city":"上海市","cityId":"310000","county":"闸北区","countyId":"310108","address":"新荟城","detail":"上海市闵行区莲花南路1388号","isDefault":0,"tag":"","status":0,"contactId":"1483087753105","userId":"blm_test"}]
        if(code === 0) {
          if (data.length === 0) {
            const { handleChange } = this.props
            handleChange('')
          }
          this.setState({
            contactList: data
          })
        }
        handleClose()
      })
    }
    handleToggleContactForm(editContact) {
      // console.log(contact)
      Mask(<SlidePage target='right' type='root'>
             <AddTourist { ...{ editContact } } onSuccess={ this.handleFormSuccess.bind(this) }  />
           </SlidePage>, { mask: false })
      // this.setState({ bContactFormShow: bShow, editContact: contact })
    }
    handleDeleteContact(contact) {
      closealert = alert('删除', '确定删除么?', [
        { text: '取消', onPress: () => console.log('cancel') },
        { text: '确定', onPress: () => {
          const { identityId, userId } = contact;console.log(contact);
          const handleClose = Loading()
          send('/user/v1/identity', { identityId, userId }, 'delete')
          .then(({ code, data, message }) => {
            if(code === 0) {
              this.fetchContact()
            }
            handleClose()
          })
        }, style: { fontWeight: 'bold' } },
      ])
    }
    handleFormSuccess() {
      this.fetchContact()
    }
    handleSetContact ( contact ) {
        // 这里是设置默认地址
        send('/user/v1/identity', merge(clone(contact), { isDefault: 1 }) , 'put')
        .then(({ code, data, message }) => {
          if(code === 0) {alert('ddd')
            this.fetchContact()
          }
        })
    }
    componentWillMount() {
      this.fetchContact()
    }
    componentWillUnmount() {
      if (closealert) {
        closealert.close()
      }
    }
    handleSuccess(contact) {
        const { handleChange, handleContainerClose } = this.props
        handleChange(contact)
        if (handleContainerClose) {
          handleContainerClose()
        }
    }
  render() {
    const { loading, bContactFormShow, contactList, editContact ,handleDefaultChange ,userId } = this.state
    const { contact = {} } = this.props
    const { contactId } = contact
    //console.log('editContact', editContact);
    return (
        <div className='contact-list'>
          <List>
            <ListItem>
              <div className='tcenter black font-x'>选择常用旅客</div>
            </ListItem>
          </List>
          <div className='touch-layer' style={{ height: 'calc(100% - 1.9rem)'}}>
          {
            contactList.map((contact, index) => (
                <div className = "listItem" key={ `contact-list-${ index }` }>
                  <Contact  checked={ contact.contactId === contactId } { ...{ index, contact } }
                            onChooseContact={ () => this.handleSuccess(contact) }
                            onDeleteContact={ () => this.handleDeleteContact(contact) }
                            onEditContact  ={ () => this.handleToggleContactForm(contact)}
                            onSetContact   ={ () => this.handleSetContact(contact) } />
                </div>

            ))
          }
          <WhiteSpace size = "lg"/>
          </div>
          <List>
            <div className = "addrNew add-text" onClick={ () => this.handleToggleContactForm() }>
              新增常用旅客
            </div>
          </List>
        </div>
    )
  }
}

export default Tourist

const Contact = ({ contact, index, checked, onChooseContact, onEditContact, onDeleteContact, onSetContact }) => {
  const { name , id , phone ,type , cardType, idCard, status ,bornDate } = contact
  contact.userId = getStore('customerUserId', 'session');
  contact.identityId = id;
  console.log('atsss',status);
  return (

    <div className = "ListItemWrap">
        <div className = "item" onClick={ onChooseContact }>
            <div className='info'>
              <span>{ name }</span>
              <span>{ phone }</span>
              {
                  type == '1' ? (<span>{ type && <span className='tag orange'>成人</span>}</span>)
                   : (type == '2' ? (<span>{ type && <span className='tag blue'>儿童</span>}</span>)
                   : (type == '3' ? (<span>{ type && <span className='tag green'>婴儿</span>}</span>):('')))
              }

            </div>
            <WhiteSpace size='md' />
            <div className='addr'>
                { cardType && <span>{ cardType }</span> }
                { idCard   && <span>{ idCard   }</span> }
            </div>
        </div>
        <div className = "moreBtn">
            <ContactControl { ...{ onEditContact, onDeleteContact, contact, onSetContact } } />
        </div>
    </div>
  )
}

const ContactControl = ({ onEditContact, onDeleteContact, contact, onSetContact }) => (
  <div>
    <div className = "iconBtn_l" onClick={ onSetContact } >
        {
            contact.isDefault == '1' ?
            (<Icon type= { ic_set} size = "sm" className='gray-4 font-m' style={{ margin: '0 .18rem 0 0' }}/>)
            : (<Icon type= { ic_noChoose} size = "sm" className='gray-4 font-m' style={{ margin: '0 .18rem 0 0' }}/>)
        }
        <span className='gray-3 font-m' >默认旅客</span>
    </div>
    <div className = "iconBtn_r">
        <Icon type= { ic_delete } size = "xxs" className='gray-4 font-m' />
        <span className='gray-3 font-m' style={{ margin: '0 .15rem' }} onClick={ onDeleteContact } >删除</span>
    </div>
    <div className = "iconBtn_r">
        <Icon type= { ic_edit} size = "xxs" className='gray-4 font-m' />
        <span className='gray-3 font-m' style={{ margin: '0 .15rem' }} onClick={ onEditContact } >编辑</span>
    </div>
  </div>
)
