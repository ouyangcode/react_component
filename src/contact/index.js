import './style/index.scss'
import React, { Component } from 'react'
import { get, send, setStore, getStore } from '@boluome/common-lib'
import { List, WhiteSpace, Icon, SwipeAction, Flex, Modal ,Checkbox }    from 'antd-mobile'
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

class CustomerList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      contactList: [],
      bContactFormShow: false,
      editContact: {}
    }
  }
    fetchContact() {
      const handleClose = Loading()

      let userId = getStore('customerUserId', 'session')
      get('/user/v1/contacts', { userId })
      .then(({ code, data, message }) => {
        // code = 0
        // data = [{"name":"tst","phone":"13812345678","gender":0,"longitude":121.48789949,"latitude":31.24916171,"province":"上海市","provinceId":"310000","city":"上海市","cityId":"310000","county":"闸北区","countyId":"310108","address":"新荟城","detail":"上海市闵行区莲花南路1388号","isDefault":0,"tag":"","status":0,"contactId":"1483087753105","userId":"blm_test"}]
        if(code === 0) {

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
             <ContactForm { ...{ editContact } } onSuccess={ this.handleFormSuccess.bind(this) }  />
           </SlidePage>, { mask: false })
      // this.setState({ bContactFormShow: bShow, editContact: contact })
    }
    handleDeleteContact(contact) {
      alert('删除', '确定删除么?', [
        { text: '取消', onPress: () => console.log('cancel') },
        { text: '确定', onPress: () => {
          const { contactId, userId } = contact
          const handleClose = Loading()
          send('/user/v1/contact', { contactId, userId }, 'delete')
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
        send('/user/v1/contact', merge(clone(contact), { isDefault: 1 }) , 'put')
        .then(({ code, data, message }) => {
          if(code === 0) {
            this.fetchContact()
          }
        })
    }
    componentWillMount() { this.fetchContact() }
    handleSuccess(contact) {
      const { handleChange, handleContainerClose } = this.props
      handleChange(contact)
      // handleBackgoorder()
      handleContainerClose()
    }
  render() {
    const { loading, bContactFormShow, contactList, editContact ,handleDefaultChange } = this.state
    const { contact = {} } = this.props
    const { contactId } = contact
    //console.log('editContact', editContact);
    return (
        <div className='contact-list'>
          <List>
            <ListItem>
              <div className='tcenter black font-x'>选择收货地址</div>
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
              新增收货地址
            </div>
          </List>
        </div>
    )
  }
}

export default CustomerList


const Contact = ({ contact, index, checked, onChooseContact, onEditContact, onDeleteContact, onSetContact }) => {
  const { name, gender = '', phone, tag, detail, province, county, address } = contact

  return (

    <div className = "ListItemWrap">
        <div className = "item" onClick={ onChooseContact }>
            <div className='info'>
              <span>{ name }</span>
              <span>{ typeof gender == 'undefined' ? '' : gender == 1 ? '女士' : '先生' }</span>
              <span>{ phone }</span>
              {
                  tag == '家' ? (<span>{ tag && <span className='tag orange'>{ tag }</span>}</span>)
                   : (tag == '公司' ? (<span>{ tag && <span className='tag blue'>{ tag }</span>}</span>)
                   : (tag == '学校' ? (<span>{ tag && <span className='tag green'>{ tag }</span>}</span>)
                   : (<span>{ tag && <span className='tag orange'>{ tag }</span>}</span>)
               ))
              }

            </div>
            <WhiteSpace size='md' />
            <div className='addr'>
                { province && <span>{ province }</span> }
                { county   && <span>{ county   }</span> }
                { address  && <span>{ address  }</span> }
            </div>
            <WhiteSpace size='md' />
            <div className='addr'>
                { detail && <span>{ detail }</span> }
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
        <span className='gray-3 font-m' >默认地址</span>
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
