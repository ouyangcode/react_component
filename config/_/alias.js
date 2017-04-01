import path from 'path'

import { SRC_PATH, SVC_PATH, MODULE_PATH } from '../../path.config'

const alias = {
  'images'  : path.resolve(SRC_PATH, 'images'),
  'business': path.resolve(SRC_PATH, 'business'),
  'services': SVC_PATH
}

export default alias
