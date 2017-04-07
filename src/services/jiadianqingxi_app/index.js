import '../../styles/index.scss'

import React      from 'react'
import { render } from 'react-dom'
import Root       from './root'
import { setServerUrl } from '@boluome/common-lib'


setServerUrl(/192.168.|localhost/.test(location.hostname)
                ? 'https://dev-api.otosaas.com'
                : `${location.origin}/api`)

 // Project interface

 // let detailsUrl = '/jiadianqingxi/v1/category/';// + :categoryId
 // let ordertimeUrl = '/jiadianqingxi/v1/category/' ;// +:categoryId/service-time
 // let orderUrl = '/jiadianqingxi/v1/order';
render(<Root />, document.querySelector('#root'))
