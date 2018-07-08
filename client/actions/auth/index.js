import authApi from '../../utils/authApi'
import createAsyncActions from './createAsync'

import { 
  AUTH_SUCCESS, 
  AUTH_FAILURE, 
  CLEAR_AUTH_SUCCESS, 
  CLEAR_AUTH_FAILURE 
} from './types'

export const clearAuthSuccess = () => ({
  type: CLEAR_AUTH_SUCCESS
})

export const authSuccess = (user) => ({
  type: AUTH_SUCCESS,
  payload: user
})

export const authFailure = (error) => ({
  type: AUTH_FAILURE,
  payload: error
})

export const clearAuthFailure = () => ({
  type: CLEAR_AUTH_FAILURE
})

export const {
  signinUser,
  signupUser,
  signoutUser,
  getMe
} = createAsyncActions({ authSuccess, authFailure, clearAuthSuccess}, authApi)








