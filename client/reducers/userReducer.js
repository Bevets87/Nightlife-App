import { SET_USER_AUTH, SET_USER, SET_ERRORS } from '../actions/userActions'

const DEFAULT_STATE = {
  isAuthenticated: false,
  user: null,
  serverErrors: {}
}

const setUserAuth = (state) => {
  return Object.assign(
    {},
    state,
    {
      isAuthenticated: !!localStorage.token,
      serverErrors: {}
    }
  )
}

const setUser = (state, action) => {
  return Object.assign(
    {},
    state,
    {
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
      isAuthenticated: !!localStorage.token
    }
  )
}

const userReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
  case SET_USER_AUTH:
    return setUserAuth(state)
  case SET_USER:
    return setUser(state, action)
  case SET_ERRORS:
    return setErrors(state, action)
  default:
    return state
  }
}

export default userReducer
