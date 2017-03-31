import path from 'path'

export const ROOT_PATH   = path.resolve(__dirname)
export const SRC_PATH    = path.resolve(ROOT_PATH, 'src')
export const SVC_PATH    = path.resolve(SRC_PATH , 'services')
export const DIST_PATH   = path.resolve(ROOT_PATH, 'dist')
export const ASSET_PATH  = path.resolve(ROOT_PATH, 'assets')
export const MODULE_PATH = path.resolve(ROOT_PATH, 'node_modules')
