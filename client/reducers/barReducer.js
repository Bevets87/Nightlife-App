import { SET_BARS } from '../actions/barActions'

const DEFAULT_STATE = {
  bars: [],
}

const setBars = (state, action) => {
  return Object.assign(
    {},
    state,
    {
      bars: action.bars
    }
  )
}

const barReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
  case SET_BARS:
    return setBars(state, action)
  default:
    return state
  }
}

export default barReducer
