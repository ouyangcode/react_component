import { clone } from './func'

export const setState = (oldState, action) => {
  delete action.type
  return clone(oldState, action)
}
