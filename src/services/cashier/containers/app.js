import { connect }  from 'react-redux'
import { browserHistory } from 'react-router'
import { wrap }     from '@boluome/oto_saas_web_app_component'
import { getStore } from '@boluome/common-lib'
import { Toast }    from 'antd-mobile'
import App          from '../components/app'
import { customerCode, getCustomerConfig, login } from 'business'

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  }
}

const mapFuncToComponent = dispatch => ({
  componentWillMount: () => {
    const customerUserId = getStore('customerUserId', 'session')
    const customerConfig = getStore('customerConfig', 'session')
    if(!(customerUserId && customerConfig)) {
      getCustomerConfig(customerCode, err => {
        if(err) { //没有获取到客户配置
          Toast.fail('没有获取到当前客户配置')
        } else {
          login(err => {
            // if(err) { //登陆失败
            //   Toast.fail('联合登陆失败')
            // } else {
              console.log('登陆成功')
              browserHistory.push('/cashier/100000397889')
            // }
          })
        }
      })
    }

  }
})

export default connect(mapStateToProps, mapDispatchToProps)(wrap(mapFuncToComponent)(App))
