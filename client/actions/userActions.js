import axios from 'axios'

export const SET_USER_AUTH = 'SET_USER_AUTH'
export const SET_USER = 'SET_USER'
export const SET_ERRORS = 'SET_ERRORS'

export function setUserAuth() {
  return {type: SET_USER_AUTH}
}

export function setUser(email) {
  return {type: SET_USER, user: email}
}

export function setErrors(errors) {
  return {type: SET_ERRORS, serverErrors: errors}
}

export function userRegistrationRequest(userData) {
  return function(dispatch) {
    return axios.post('/register', userData)
      .then(
        response => {
          localStorage.setItem('token', response.data.token)
          dispatch(setUserAuth())
          dispatch(setUser(response.data.email))
        })
      .catch(
        error => {
          dispatch(setErrors(error.response.data.errors))
        })
  }
}



export function userLoginRequest(userData) {
  return function(dispatch) {
    return axios.post('/login', userData)
      .then(
        response => {
          localStorage.setItem('token', response.data.token)
          dispatch(setUserAuth())
          dispatch(setUser(response.data.email))
        })
      .catch(
        error => {
          dispatch(setErrors(error.response.data.errors))
        })
  }
}
