import createAuthApi from '../../../client/utils/createAuthApi'
import tokenApi from '../../../client/utils/tokenApi'

describe('createAuthApi util function', () => {
  let fetchImpl, mockAuthApi
  beforeEach(() => {
    tokenApi.setToken('tokenstring')
    fetchImpl = {
      get: jest.fn(() => Promise.resolve()),
      post: jest.fn(() => Promise.resolve({ headers: { 'x-auth-token': 'tokenstring' } }))
    }
    mockAuthApi = createAuthApi(fetchImpl)
  })

  
  it('has signinUser method that calls authApi.post() with email and password', (done) => {
    const user = { email: 'test@test.com', password: 'password' }
    mockAuthApi.signinUser(user)
      .then(() => {
        expect(fetchImpl.post).toHaveBeenCalledTimes(1)
        expect(fetchImpl.post).toHaveBeenCalledWith('/api/users/signin', user)
        done()
      })
  })

  it('has a signupUser method that calls authApi.post() with email, password and passwordConfirmation', (done) => {
    const user = { email: 'test@test.com', password: 'password', passwordConfirmation: 'password' }
    mockAuthApi.signupUser(user)
      .then(() => {
        expect(fetchImpl.post).toHaveBeenCalledTimes(1)
        expect(fetchImpl.post).toHaveBeenCalledWith('/api/users', user)
        done()
      })
  })

  it('has a signoutUser method that removes token from localStorage', (done) => {
    expect(localStorage.getItem('token')).toContain('tokenstring')
    mockAuthApi.signoutUser()
      .then(() => {
        expect(localStorage.getItem('token')).toBeUndefined()
        done()
      })
  })

  it('has a getMe method that requires a token and calls fetchImpl.get() with token', (done) => {
    mockAuthApi.getMe()
      .then(() => {
        expect(fetchImpl.get).toHaveBeenCalledTimes(1)
        expect(fetchImpl.get).toHaveBeenCalledWith('/api/users/me', { headers: { authorization: tokenApi.getToken() } })
        done()
      })

  })
})