import { SET_USER, SET_ERRORS } from '../actions/userActions'

const DEFAULT_STATE = {
  isAuthenticated: false,
  user: null,
  serverErrors: {}
}

const setUser = (state, action) => {
  return Object.assign(
    {},
    state,
    {
      isAuthenticated: action.isAuthenticated,
      user: action.user,
      serverErrors: {}
    }
  )
}

const setErrors = (state, action) => {
  return Object.assign(
    {},
    state,
    {
      serverErrors: action.serverErrors,
      user: null,
      isAuthenticated: false
    }
  )
}

const userReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
  case SET_USER:
    return setUser(state, action)
  case SET_ERRORS:
    return setErrors(state, action)
  default:
    return state
  }
}

export default userReducer
