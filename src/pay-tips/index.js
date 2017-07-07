import React from 'react'
import { Modal, Icon } from 'antd-mobile'

import './index.scss'

export default class PayTips extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
    }
    this.showModal = this.showModal.bind(this)
  }

  showModal(b) {
    this.setState({ showModal: b })
  }

  render() {
    const textStyle = {
      height:     '5.54rem',
      overflow:   'auto',
      textAlign:  'left',
      fontSize:   '.24rem',
      color:      '#999999',
      lineHeight: '.36rem',
    }
    const tipStyle = {
      fontSize:   '.24rem',
      color:      '#ffab00',
      float:      'left',
      lineHeight: '.70rem',
    }
    const iconStyle = {
      float:       'left',
      marginTop:  '.19rem',
      marginRight: '.1rem',
      marginLeft:  '.3rem',
    }

    const { title, content } = this.props
    return (
      <div>
        <div style={{ overflow: 'hidden', clear: 'both' }}>
          <Icon style={ iconStyle } type={ require('./payTips.svg') } size='xxs' />
          <p style={ tipStyle } onClick={ () => this.showModal(true) }>缴费说明</p>
        </div>
        <Modal
          title={ title }
          className='pay-tips'
          transparent
          maskClosable={ false }
          visible={ this.state.showModal }
          onClose={ () => this.showModal(false) }
          footer={ [{ text: '我知道了', onPress: () => this.showModal(false) }] }
          style={{ width: '6.9rem', height: '9rem' }}
        >
          <div style={ textStyle }>{ content }</div>
        </Modal>
      </div>
    )
  }
}
