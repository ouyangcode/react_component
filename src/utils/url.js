import { each } from './func'

export const parseSearch = () => location.search.substring(1).split('&').reduce((query, o) => o.split('=').reduce((k, v) => (query[k] = decodeURIComponent(v)) && query), {})

export const stringifySearch = (o, search = []) => each(o, (k, v) => search.push(`${ k }=${ encodeURIComponent(v) }`)) && `?${ search.join('&') }`
