'use strict'

import objectAssign from 'object-assign'

export const each = (o, fn) => {
  if(Array.isArray(o)) {
    o.forEach((o, i) => fn(o, i))
  } else if(typeof o == 'object') {
    for(let k in o) {
      fn(k, o[k])
    }
  }
  return true
}
export const len   = o => {
  if(o.length) {
    return o.length
  } else if(typeof o == 'object') {
    let count = 0
    each(o, () => count++)
    return count
  }
  return 0
}
export const setTitle = title => (document.title = title)

export const call = phone => location.href = `tel:${ phone }`

export const sum   = (num, num2) => num + num2

export const minus = (num, num2) => num - num2

export const clone  = (o, newState = {}) => objectAssign(Array.isArray(o) ? [] : {}, o, newState)


export const extend = (o, newState = {}) => objectAssign(o , o, newState)

export const toJSON = str => JSON.parse(str || '{}')

export const stringifyJSON = o => JSON.stringify(o)
