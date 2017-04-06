import { toJSON, stringifyJSON } from './func'

const store = window.localStorage

export const get = k => store.getItem(k)

export const oget= k => toJSON(get(k) || '{}')

export const set = (k, v) => store.setItem(k, v)

export const oset= (k, o) => set(k, stringifyJSON(o))

export const remove = k => store.removeItem(k)
