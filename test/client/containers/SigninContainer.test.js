import React from 'react'
import { Simulate } from 'react-testing-library'
import moxios from 'moxios'
import { renderWithReduxAndRouter, withRoute } from '../helpers'
import SigninContainer from '../../../client/containers/SigninContainer'

const SigninContainerWithRoute = withRoute(SigninContainer)

const renderSigninContainer = ({ initialState = {}, route = '/', props = {} }) => {
    
  return renderWithReduxAndRouter(<SigninContainerWithRoute path={route} {...props} />, { initialState }, { route })
}

describe('SigninContainer', () => {
   
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

    
  it('can signinUser() and dispatch authSuccess() action', (done) => {
    const route = '/signin'
    const  { getByPlaceholderText, getByText, history, store } = renderSigninContainer({ route })
  
    Simulate.change(getByPlaceholderText('email'), onChangeValue('test@test.com'))
    Simulate.change(getByPlaceholderText('password'), onChangeValue('password'))
    Simulate.click(getByText('Submit'))
    moxios.wait(() => {
      let request = moxios.requests.mostRecent()
      expect(request.url).toMatch('/api/users/signin')
      expect(history.location.pathname).toMatch('/signin')
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

  it('can signinUser() and dispatch authFailure() action', (done) => {
    const route = '/signin'
    const { getByPlaceholderText, getByText, getByTestId, store  } = renderSigninContainer({ route })
    Simulate.change(getByPlaceholderText('email'), onChangeValue('test@test.com'))
    Simulate.change(getByPlaceholderText('password'), onChangeValue('password'))
    Simulate.click(getByText('Submit'))

    moxios.wait(() => {
      let request = moxios.requests.mostRecent()
      expect(request.url).toMatch('/api/users/signin')
      request.respondWith({
        status: 400,
        response: { message: 'Invalid email or password' }
      })
        .then(() => {
          
          expect(getByTestId('signin-error').textContent).toContain('Invalid email or password')   
          done()   
        })
    })
 

  
  })

  it('can redirect to / when authenticated', () => {
    const route = '/signin'
    const initialState = { auth: authState }
    const { history, container } = renderSigninContainer({ initialState, route })
    

    expect(history.location.pathname).toMatch('/')
  })
})
