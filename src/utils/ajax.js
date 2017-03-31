
import { stringifySearch } from './url'
import { clone } from './func'

export const serverUrl = /192.168.|localhost/.test(location.hostname)
                         ? 'https://dev-api.otosaas.com'
                         : `${ location.origin }/api`

//'http://139.198.0.28:38800'

export const api = path => /^(http|https)/.test(path) ? path : `${ serverUrl }${ path }`

export const get  = (url, data = {}) => fetch(api(`${ url }${ stringifySearch(data) }`)).then(resp => resp.json())

export const send = (url, data, method = 'post', header = {}) => {
  if(typeof method == 'object') {
    header = method
    method = 'post'
  }
  //console.log(header, method, data)
  const postHeader = clone({ 'Content-Type': 'application/json' }, header)
  let postBody = JSON.stringify(data)
  if(postHeader['Content-Type'] === 'application/x-www-form-urlencoded') {
    postBody = stringifySearch(data).replace('?', '')
  }

  return fetch(api(url), {
                    method : method,
                    headers: postHeader,
                    body   : postBody
                  }).then(resp => resp.json())
}

export const getText = url => fetch(url).then(resp => resp.text())
