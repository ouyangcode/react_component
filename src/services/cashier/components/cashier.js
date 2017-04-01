import React from 'react'

import iconLine       from 'images/l.png'
import back_src       from 'images/back.png'
import chooseIcon     from 'images/choose.png'
import nochooseIcon   from 'images/nochoose.png'
import { paymentEnum, customerCode } from 'business'
import { List, WhiteSpace } from 'antd-mobile'

const ListItem = List.Item

const Cashier = ({ orderlite = {}, currentPayment = 'alipay', customerPayment = [], handleChangePayment, handlePay }) => {
  const { name = '', price = 0 } = orderlite
  // console.log(customerCode, iOS)
  // customerCode = 'abchina'
  return (
    <div className='cashier-container'>
      <div className='cashier-info'>
        <div className='title'>{ name }</div>
        <div className='sub-title'>
          <span className='gray tmr font-m price-name'>订单金额</span>
          <span className='red font-m price'>{ `￥${ price }` }</span>
        </div>

      </div>
      <WhiteSpace size='md' />
      <List>
        {
          customerPayment.map(p => {
            const { name, code, icon, handler } = paymentEnum[p]
            const bChoose = currentPayment.code === code
              return (
                <ListItem key={ `${ Math.random() }` }
                          extra={ <img src={ bChoose ? chooseIcon : nochooseIcon }
                          style={ iconStyle } /> } onClick={ () => handleChangePayment(paymentEnum[p]) }>
                  <img src={ icon }  style={ { ...iconStyle, marginRight: '.12rem' } } /><span style={{ fontSize: '.28rem' }}>{ name }</span>
                </ListItem>
              )
            }
          )
        }
      </List>
      <div style={{padding: '.32rem'}}>
        <button className='btn wp100 primary' onClick={ () => handlePay(orderlite, currentPayment) }>支付</button>
      </div>

      { customerCode === 'mybosc' && <BoscForm /> }

    </div>
  )
}

export default Cashier

const iconStyle = {
  height: '.4rem', width: '.4rem', margin: '-6px 6px 0 0'
}

const BoscForm = () => (
  <div>
    <form method="post" id="boscForm" action="https://203.156.238.218:8777/boscartoon/eCardPay.action">
      <input type='hidden' name='signData' value='PbMFvcrbuMkIjiL6EsbP9urDW4+A9kfmUZpRIZcymwgCLoRXTLfyPck7kpR75yHzOBvDwNAXp+GF\nyIlLZN+h57rJZcYlx2lEJbxfs1JuuKK8qHgaPyacZB4uZZJbmEj7lfCVPffGXccGPpBNqr5KBbs6\nuQqGl318ejyzHbxXyPA='/>
      <input type='hidden' name='curType' value='156'/>
      <input type='hidden' name='tokenId' value='FhfzwVU/oTFEw+Kw1tfFBOEqSniSROIFqW2MF4BKQSrn7Du03donNgiWQYcz PNFexqupJyooRCA9iG2sbF0oIfjorbp2nmD4RQK/wk/7nmgQhUC+FKcxsgD9 0UTIRSYYusLtH/fb7BM++pdpc317g3//T2O7d+Ovz3lyWL9BMRX3Z5xMaq8z 9Q=='/>
      <input type='hidden' name='merOrderAmt' value='4800'/>
      <input type='hidden' name='merOrderNum' value='100000393179'/>
      <input type='hidden' name='koalB64Cert' value='MIID4zCCAsugAwIBAgIQEAAAAAAAAAAAAAAgFoKYaDANBgkqhkiG9w0BAQUFADBZMQswCQYDVQQG\nEwJDTjEwMC4GA1UEChMnQ2hpbmEgRmluYW5jaWFsIENlcnRpZmljYXRpb24gQXV0aG9yaXR5MRgw\nFgYDVQQDEw9DRkNBIFRFU1QgT0NBMTEwHhcNMTcwMTAzMTAwMjUwWhcNMTgwMTAyMTYwMDAwWjCB\nrjELMAkGA1UEBhMCQ04xFTATBgNVBAoTDENGQ0EgVEVTVCBDQTENMAsGA1UECxMES09BTDESMBAG\nA1UECxMJQ3VzdG9tZXJzMWUwYwYDVQQDDFwwNDFAWjIwMTcwMTAzMTAxMDE4OEBtMTEwMzEwMDE4\nMDAwMDMzJOiWquWkqui9r++8iOS4iua1t++8ieenkeaKgOWPkeWxleaciemZkOWFrOWPuEAwMDAw\nMDAwNTCBnzANBgkqhkiG9w0BAQEFAAOBjQAwgYkCgYEAm/k/1iMSpeezNHagc3++1BOUO9VdbK/E\nGrGIAghO8Aq7CBFyO1Yo5OBJ0TesasF+0S3FDLg2q4BrDyuI1HsRRTs3Z3mLc3wvjKorxNaztklp\nsx3e+T+4knBY4SGRPS/VNYrhjoCETP1xXUE+w79pyyaWpAr/llc8+JFJk0lB/2ECAwEAAaOB1DCB\n0TAfBgNVHSMEGDAWgBT8C7xEmg4xoYOpgYcnHgVCxr9W+DAJBgNVHRMEAjAAMDoGA1UdHwQzMDEw\nL6AtoCuGKWh0dHA6Ly8yMTAuNzQuNDIuMy9PQ0ExMS9SU0EvY3JsMTU2ODkuY3JsMAsGA1UdDwQE\nAwIFoDAdBgNVHQ4EFgQU1JHtJFUSXb8pU+9oJ7UOM4o4nh8wOwYDVR0lBDQwMgYIKwYBBQUHAwIG\nCCsGAQUFBwMDBggrBgEFBQcDBAYIKwYBBQUHAwEGCCsGAQUFBwMIMA0GCSqGSIb3DQEBBQUAA4IB\nAQBomLSfeTjF6z5TCXF7o+W5G+31QqTRzRTEs3bGw/J1vm4lFOldPtONMjhddh+GaCCt35ancOz6\nd8foKnNqoylNeNQbTAQ7AlaZJelKHa70VbHGGRckh4nEVaXc+b/+yYr6OqvMeiWKVljmS3yxKidh\nPeQUJRnIAv8qtbyBwS58Vx/w8W2LF2YiMMEKGdf7WTuCJVlIxqVE0DECdhjR/GE1B0/a+eFHc6kH\n2C1HSzJMYLlR6B4yLrxwxmHxkgHdJG7zZXa9ttznhy/Bfbzz14ipBJ52VpNAa0TomVMPD0yWlZJ4\n67QcRN4FhTo1WkWtzDVg94QGol50f0e6WgdFFsa7'/>
      <input type='hidden' name='userId' value='201612060000015593'/>
      <input type='hidden' name='shortcutMerCode' value='110310018000033'/>
      <input type='hidden' name='shortcutMerName' value='blm'/>
      <input type='hidden' name='merNotifyUrl' value='http://139.198.1.168:32008/mybosc/v1/notifyUrl'/>
      <input type='hidden' name='orderTime' value='180541'/>
      <input type='hidden' name='merchantID' value='110310018000033'/>
      <input type='hidden' name='digest' value='WF033'/>
      <input type='hidden' name='merGetGoodsUrl' value='http://222.10.21.23:80/getResult.aspx'/>
      <input type='hidden' name='describe' value='菠萝觅-支付'/>
      <input type='hidden' name='orderDate' value='20170109'/>
    </form>
  </div>
)
