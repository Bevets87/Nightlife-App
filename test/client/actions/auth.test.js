import createAsyncActions from '../../../client/actions/auth/createAsync'
import { authSuccess, clearAuthSuccess, authFailure, clearAuthFailure } from '../../../client/actions/auth'
import { AUTH_SUCCESS, AUTH_FAILURE, CLEAR_AUTH_SUCCESS, CLEAR_AUTH_FAILURE } from '../../../client/actions/auth/types'

describe('Auth actions', () => {
  
  const fakeResponse = { data: 'test@test.com' }
  const fakeError = { response: { data: { message: 'fail' } } }
  
  const succeedWithResponse = jest.fn((user) => Promise.resolve(fakeResponse))
  const failWithError = jest.fn((user) => Promise.reject(fakeError))
  const succeed = jest.fn(() => Promise.resolve())
  
  const withSuccessApi = {
    getMe: succeedWithResponse,
    signinUser: succeedWithResponse,
    signupUser: succeedWithResponse,
    signoutUser: succeed
  }
  
  const withFailureApi = {
    getMe: failWithError,
    signinUser: failWithError,
    signupUser: failWithError,
    signoutUser: succeed

  }
    
    

  const createFakeAsyncActions = (fakeAuthApi) => createAsyncActions({ authSuccess, clearAuthSuccess, authFailure }, fakeAuthApi)
  

  it('creates an action of type AUTH_SUCCESS and payload email', () => {
    const action = authSuccess('test@test.com')
    expect(action.type).toContain(AUTH_SUCCESS)
    expect(action.payload).toContain('test@test.com')
  })

  it('creates an action of type AUTH_FAILURE and payload error.message', () => {
    const error = { message: 'fail' }
    const action = authFailure(error)
    expect(action.type).toContain(AUTH_FAILURE)
    expect(action.payload).toMatchObject({ message: 'fail'})
  })

  it('creates an action of type CLEAR_AUTH_SUCCESS', () => {
    const action = clearAuthSuccess()
    expect(action.type).toContain(CLEAR_AUTH_SUCCESS)
  })

  it('creates an action of type CLEAR_AUTH_FAILURE', () => {
    const action = clearAuthFailure()
    expect(action.type).toContain(CLEAR_AUTH_FAILURE)
  })

  it('dispatches an authSuccess() action if signinUser succeeds', (done) => {
    const user = jest.mock
    const dispatch = jest.fn()
    const { signinUser } = createFakeAsyncActions(withSuccessApi)
    signinUser(user)(dispatch)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1)
        expect(dispatch).toHaveBeenCalledWith(authSuccess('test@test.com'))
        done()
      })
  })

  it('dispatches an authSuccess() action if signupUser succeeds', (done) => {
    const user = jest.mock 
    const dispatch = jest.fn()
    const { signupUser } = createFakeAsyncActions(withSuccessApi)
    signupUser(user)(dispatch)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1)
        expect(dispatch).toHaveBeenCalledWith(authSuccess('test@test.com'))
        done()
      })
  })

  it('dispatches an authSuccess() action if getMe succeeds', (done) => {
    const dispatch = jest.fn()
    const { getMe } = createFakeAsyncActions(withSuccessApi)
    getMe()(dispatch)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1)
        expect(dispatch).toHaveBeenCalledWith(authSuccess('test@test.com'))
        done()
      })
  })

  it('dispatches a clearAuthSuccess() action if signoutUser succeeds', (done) => {
    const dispatch = jest.fn()
    const { signoutUser } = createFakeAsyncActions(withSuccessApi)
    signoutUser()(dispatch)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1)
        expect(dispatch).toHaveBeenCalledWith(clearAuthSuccess())
        done()
      })
  })

  it('dispatches an authFailure() action if signinUser fails', (done) => {
    const user = jest.mock
    const dispatch = jest.fn()
    const { signinUser } = createFakeAsyncActions(withFailureApi)
    signinUser(user)(dispatch)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1)
        expect(dispatch).toHaveBeenCalledWith(authFailure({ message: 'fail' }))
        done()
      })
  })

  it('dispatches an authFailure() action if signupUser fails', (done) => {
    const user = jest.mock
    const dispatch = jest.fn()
    const { signupUser } = createFakeAsyncActions(withFailureApi)
    signupUser(user)(dispatch)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1)
        expect(dispatch).toHaveBeenCalledWith(authFailure({ message: 'fail' }))
        done()
      })
  })






})