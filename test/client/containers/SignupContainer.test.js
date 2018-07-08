import React from 'react'
import { Simulate } from 'react-testing-library'
import moxios from 'moxios'
import { renderWithReduxAndRouter, withRoute } from '../helpers'
import SignupContainer from '../../../client/containers/SignupContainer'

const SignupContainerWithRoute = withRoute(SignupContainer)

const renderSignupContainer = ({ initialState = {}, route = '/', props = {} }) => {

  return renderWithReduxAndRouter(<SignupContainerWithRoute path={route} {...props} />, { initialState }, { route })
}

describe('SignupContainer', () => {
  beforeEach(() => {

    localStorage.removeItem('token')
    moxios.install()
  })

  afterEach(() => {

    moxios.uninstall()
  })

  const authState = {
    authenticated: true,
    email: 'test@test.com',
    error: null
  }

  const onChangeValue = (value) => ({
    target: { value }
  })


  it('can signupUser() and dispatch authSuccess() action', (done) => {
    const route = '/signup'
    const { getByPlaceholderText, getByText, history, store } = renderSignupContainer({ route })

    Simulate.change(getByPlaceholderText('email'), onChangeValue('test@test.com'))
    Simulate.change(getByPlaceholderText('password'), onChangeValue('password'))
    Simulate.change(getByPlaceholderText('password confirmation'), onChangeValue('password'))
    Simulate.click(getByText('Submit'))
    moxios.wait(() => {
      let request = moxios.requests.mostRecent()
      expect(request.url).toMatch('/api/users')
      expect(history.location.pathname).toMatch('/signup')
      request.respondWith({
        status: 200,
        headers: { 'x-auth-token': 'token' },
        response: 'test@test.com'
      })
        .then(() => {
          expect(localStorage.getItem('token')).toContain('token')
          expect(history.location.pathname).toMatch('/')
          expect(store.getState().auth.authenticated).toBeTruthy()
          expect(store.getState().auth.email).toContain('test@test.com')
          done()
        })
    })
  })

  it('can signupUser() and dispatch authFailure() action', (done) => {
    const route = '/signup'
    const { getByPlaceholderText, getByText, getByTestId, store } = renderSignupContainer({ route })
    Simulate.change(getByPlaceholderText('email'), onChangeValue('test@test.com'))
    Simulate.change(getByPlaceholderText('password'), onChangeValue('password'))
    Simulate.change(getByPlaceholderText('password confirmation'), onChangeValue('password'))
    Simulate.click(getByText('Submit'))

    moxios.wait(() => {
      let request = moxios.requests.mostRecent()
      expect(request.url).toMatch('/api/users')
      request.respondWith({
        status: 400,
        response: { message: 'Invalid email or password' }
      })
        .then(() => {

          expect(getByTestId('signup-error').textContent).toContain('Invalid email or password')
          done()
        })
    })



  })

  it('can redirect to / when authenticated', () => {
    const route = '/signup'
    const initialState = { auth: authState }
    const { history, container } = renderSignupContainer({ initialState, route })


    expect(history.location.pathname).toMatch('/')
  })
})