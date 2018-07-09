import { getToken, setToken, removeToken } from './tokenApi'
import validateSignin from '../validations/signin'
import validateSignup from '../validations/signup'
import config from '../../config'

export default (fetchImpl) => {

  const _setTokenFromResponse = (response) => {
    setToken(response.headers['x-auth-token'])
    return Promise.resolve(response)
  }

  const _removeTokenAndResolve = () => {
    removeToken()
    return Promise.resolve()
  }
  
  const getMe = () => fetchImpl.get('/api/users/me', { headers: { authorization: getToken() } })
  const signinUser = (user) => fetchImpl.post('/api/users/signin', user)
  const signupUser = (user) => fetchImpl.post('/api/users', user)

  return {
    getMe,
    signinUser: (user) => validateSignin(user)
      .then((user) => signinUser(user).then(_setTokenFromResponse)),
    signupUser: (user) => validateSignup(user)
      .then((user) => signupUser(user).then(_setTokenFromResponse)),
    signoutUser: _removeTokenAndResolve
  }

}