import path from 'path'
import { SVC_PATH, DIST_PATH } from '../path.config'
import config from './_'

export const define = name => {
  config.entry.app         = path.resolve(SVC_PATH , name)
  config.output.path       = path.resolve(DIST_PATH, name)
  config.output.publicPath = `/${ name }/`
  return config
}

export default config
