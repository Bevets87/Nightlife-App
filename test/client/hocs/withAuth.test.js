import React from 'react'
import moxios from 'moxios'
import { Simulate, wait } from 'react-testing-library'
import { renderWithReduxAndRouter, withRoute } from '../helpers'
import { string, func, bool, object } from 'prop-types'
import withAuth from '../../../client/hocs/withAuth'


const UserView = ({ user, signoutUser }) => {

  return (
    <div>
      <h1 data-testid='user'>{user}</h1>
      <button onClick={signoutUser}>Sign Out</button>

    </div>
  )
}

UserView.propTypes = {
  user: string,
  signoutUser: func
}

const AuthView = ({
  signinUser,
  signupUser,
  signoutUser,
  authenticated,
  clearAuthError,
  authError,
  user
}) => {

   
  return (
    <div>
      <button onClick={() => { signinUser({ email: 'test@test.com', password: 'password' }) }}>Sign In</button>
      <button onClick={() => { signupUser({ email: 'test@test.com', password: 'password', passwordConfirmation: 'password' }) }}>Sign Up</button>
      <button onClick={clearAuthError}>Clear Error</button>
      <span data-testid='auth-error'>{authError ? authError.message : null}</span>
      {authenticated ? <UserView user={user} signoutUser={signoutUser} /> : null}
    </div>
  )
}

AuthView.propTypes = {
  signinUser: func,
  signupUser: func,
  signoutUser: func,
  clearAuthError: func,
  authenticated: bool,
  authError: object,
  user: string
}

const AuthContainerWithRoute = withRoute(withAuth(AuthView))

const setUpTest = ({ initialState = {}, route = '/' }) => {
  return renderWithReduxAndRouter(<AuthContainerWithRoute path={route} />, { initialState }, { route })
}

const authState = {
  authenticated: true,
  email: 'test@test.com',
  error: null
}

const unauthState = {
  authenticated: false,
  email: null,
  error: null
}

const errorState = {
  authenticated: false,
  email: null,
  error: { message: 'auth failed' }
}

describe('withAuth', () => {

  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    localStorage.removeItem('token')
    moxios.uninstall()
  })

  

  it('can render an auth state from the redux store', () => {
    const initialState = { auth: authState }
    const { getByTestId, store } = setUpTest({ initialState })
    const { auth } = store.getState()
    expect(auth.authenticated).toBeTruthy()
    expect(auth.email).toContain('test@test.com')
    expect(getByTestId('user').textContent).toContain('test@test.com')
  })

  it('can render an auth.error from the redux store', () => {
    const initialState = { auth: errorState }
    const { getByTestId, store } = setUpTest({ initialState })
    const { auth } = store.getState()
    expect(auth.error.message).toContain('auth failed')
    expect(getByTestId('auth-error').textContent).toContain('auth failed')
  })

  it('can clear auth.error from the redux store when user clicks Clear Error', () => {
    const initialState = { auth: errorState }
    const { getByText, getByTestId, store } = setUpTest({ initialState })
    Simulate.click(getByText('Clear Error'))

    expect(store.getState().auth.error).toBeNull()
    expect(getByTestId('auth-error').textContent).toContain('')
  })




  it('can signoutUser when an auth user clicks Sign Out', (done) => {
    const initialState = { auth: authState }
    const token = 'token'
    localStorage.setItem('token', token)
    const { getByText, queryByText, store } = setUpTest({ initialState })

    expect(store.getState().auth.authenticated).toBeTruthy()
    expect(localStorage.getItem('token')).toBe(token)

    Simulate.click(getByText('Sign Out'))
    wait(() => expect(queryByText('Sign Out')).toBeNull())
      .then(() => {
        expect(store.getState().auth.authenticated).toBeFalsy()
        expect(localStorage.getItem('token')).toBeUndefined()
        done()
      })

  })

  it('can signinUser when an unauth user clicks Sign In', (done) => {
    const initialState = { auth: unauthState }
    const { getByText, getByTestId, store } = setUpTest({ initialState })

    expect(localStorage.getItem('token')).toBeUndefined()
    expect(store.getState().auth.authenticated).toBeFalsy()
    Simulate.click(getByText('Sign In'))

    moxios.wait(() => {
      let request = moxios.requests.mostRecent()
      expect(request.url).toMatch('/api/users/signin')

      request.respondWith({
        status: 200,
        headers: { 'x-auth-token': 'secret-token' },
        response: 'test@test.com'
      })
        .then(() => {
          expect(localStorage.getItem('token')).toContain('secret-token')
          expect(store.getState().auth.authenticated).toBeTruthy()
          expect(store.getState().auth.email).toContain('test@test.com')
          expect(getByTestId('user').textContent).toContain('test@test.com')
          done()
        })
    })

  })

  it('can signupUser when an unauth user clicks Sign Up', (done) => {
    const initialState = { auth: unauthState }
    const { getByText, getByTestId, store } = setUpTest({ initialState })

    expect(localStorage.getItem('token')).toBeUndefined()
    expect(store.getState().auth.authenticated).toBeFalsy()
    Simulate.click(getByText('Sign Up'))

    moxios.wait(() => {
      let request = moxios.requests.mostRecent()
      expect(request.url).toMatch('/api/users')

      request.respondWith({
        status: 200,
        headers: { 'x-auth-token': 'secret-token' },
        response: 'test@test.com'
      })
        .then(() => {
          expect(localStorage.getItem('token')).toContain('secret-token')
          expect(store.getState().auth.authenticated).toBeTruthy()
          expect(store.getState().auth.email).toContain('test@test.com')
          expect(getByTestId('user').textContent).toContain('test@test.com')
          done()
        })
    })
  })
})



