import { SET_MODE } from '../actions/mode/types'

export default (state = 'fetch', action) => {
  if (action.type === SET_MODE) {
    return action.payload
  }
  return state
}

