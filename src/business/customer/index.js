import { login             } from './login'
import { getLocation       } from './geolocation'
import { getCustomerConfig } from './config'
import { compose } from '@boluome/common-lib'

export const customerCode = location.host.replace(/(.test.otosaas.com|.otosaas.com)/, '')

//联合登陆
export const unionLogin = callback => {
  getCustomerConfig(customerCode, () => {
    login(err => {
      if(err) {
        callback(err)
      } else {
        getLocation(callback)
      }
    })
  })
}

export { getCustomerConfig, login, getLocation }
