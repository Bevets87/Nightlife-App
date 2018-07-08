import authReducer from '../../../client/reducers/auth'
import { AUTH_SUCCESS, AUTH_FAILURE, CLEAR_AUTH_SUCCESS, CLEAR_AUTH_FAILURE } from '../../../client/actions/auth/types'

describe('authReducer', () => {
  
  const InitialState = {
    authenticated: false,
    email: null,
    error: null
  }

  const AuthSuccessState = {
    authenticated: true,
    email: 'test@test.com',
    error: null
  }

  const AuthFailureState = {
    authenticated: false,
    email: null,
    error: 'auth error'
  }

  it('should return the initial state', () => {
    const state = undefined
    const action = { type: null }
    expect(authReducer(state, action)).toMatchObject(InitialState)
  })

  it('can handle AUTH_SUCCESS', () => {
    const state = undefined
    const action = { type: AUTH_SUCCESS, payload: 'test@test.com' }
    expect(authReducer(state, action)).toMatchObject(AuthSuccessState)
  })

  it('can handle AUTH_FAILURE', () => {
    const state = undefined 
    const action = { type: AUTH_FAILURE, payload: 'auth error' }
    expect(authReducer(state, action)).toMatchObject(AuthFailureState) 
  })

  it('can handle CLEAR_AUTH_SUCCESS', () => {
    const state = AuthSuccessState
    const action = { type: CLEAR_AUTH_SUCCESS }
    expect(authReducer(state, action)).toMatchObject(InitialState)
  })

  it('can handle CLEAR_AUTH_FAILURE', () => {
    const state = AuthFailureState
    const action = { type: CLEAR_AUTH_FAILURE }
    expect(authReducer(state, action)).toMatchObject(InitialState)
  })

})


