import {
  AUTH_SUCCESS,
  AUTH_FAILURE,
  CLEAR_AUTH_SUCCESS,
  CLEAR_AUTH_FAILURE 
} from '../actions/auth/types'

const InitialState = {
  authenticated: false,
  email: null,
  error: null 
}

export default (state = InitialState, action) => {
  if (action.type === AUTH_SUCCESS) {
    return { ...state, authenticated: true, email: action.payload }
  }
  if (action.type === AUTH_FAILURE) {
    return { ...state, error: action.payload }
  }
  if (action.type === CLEAR_AUTH_SUCCESS) {
    return { ...state, authenticated: false, email: null }
  }
  if (action.type === CLEAR_AUTH_FAILURE) {
    return { ...state, error: null }
  }
  return state 
}