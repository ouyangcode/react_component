import '../sass/index.scss'

import { render } from 'react-dom'
import routes     from './router'

import { setServerUrl, api, get, send, setStore, getStore, removeStore } from '@boluome/common-lib'

setServerUrl(/^192.168.|localhost|component/.test(location.hostname)
                ? 'https://dev-api.otosaas.com'
                : `${location.origin}/api`)

setStore('customerUserId'   , 'test_lon', 'session')
setStore('customerUserPhone', 'blm_test', 'session')

new BMap.Geolocation()
  .getCurrentPosition((reply) => {
    const { lat, lng } = reply.point
    const point = { latitude: lat, longitude: lng }
    setStore('geopoint', point, 'session')
    const BPoint = new BMap.Point(point.longitude, point.latitude)
    const BCoder = new BMap.Geocoder()
    BCoder.getLocation(BPoint, ({ address, addressComponents }) => {
      setStore('currentAddress' , address          , 'session')
      setStore('currentPosition', addressComponents, 'session')
    })
  })

render(routes, document.getElementById('root'))
