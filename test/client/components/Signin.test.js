import React from 'react'
import { render, Simulate } from 'react-testing-library'
import Signin from '../../../client/components/Signin'


describe('Signin component', () => {

  const renderSignin = (props) => render(<Signin {...props} />)
  
  const changeValue = (value) => ({
    target: { value }
  })

  const fakeUser = {
    email: 'test@test.com',
    password: 'password'
  }

  const fakeProps = {
    signinUser: jest.fn(),
    authError: null,
    clearAuthError: jest.fn(),
    authenticated: false,
    redirect: jest.fn(),
    renderRedirect: jest.fn(() => null)
  }

 
  it('renders a proper signin form', () => {
    const { getByTestId } = renderSignin(fakeProps)
    expect(getByTestId('signin-title').textContent).toContain('Sign In')
    
  })

  it('signs a user in when the submit button is clicked', () => {
    const { getByText, getByPlaceholderText } = renderSignin(fakeProps)
    Simulate.change(getByPlaceholderText('email'), changeValue(fakeUser.email))
    Simulate.change(getByPlaceholderText('password'), changeValue(fakeUser.password))
    Simulate.click(getByText('Submit'))
    expect(fakeProps.clearAuthError).toHaveBeenCalledTimes(1)
    expect(fakeProps.signinUser).toHaveBeenCalledTimes(1)
    expect(fakeProps.signinUser).toHaveBeenLastCalledWith(fakeUser)
  })

  it('redirects to the signup page when the signup button is clicked', () => {
    const { getByText } = renderSignin(fakeProps)
    Simulate.click(getByText('Sign Up'))
    expect(fakeProps.redirect).toHaveBeenCalledTimes(1)
    expect(fakeProps.redirect).toHaveBeenCalledWith('/signup')
  })

  it('shows no auth error when authError is null', () => {
    const { getByTestId } = renderSignin({ ...fakeProps, authError: null })
    expect(getByTestId('signin-error').textContent).toContain('')
  })

  it('shows an auth error when authError has a message prop', () => {
    const { getByTestId } = renderSignin({ ...fakeProps, authError: { message: 'There is a signin error' } })
    expect(getByTestId('signin-error').textContent).toContain('There is a signin error')
  })


  it('redirects to the landing page when a user is authenticated', () => {
    const authFakeProps = { ...fakeProps, authenticated: true }
    renderSignin(authFakeProps)
    expect(authFakeProps.renderRedirect).toHaveBeenCalledTimes(1)
    expect(authFakeProps.renderRedirect).toHaveBeenCalledWith('/')
  })

  it('clears any auth error when unmounting', () => {
    const authErrorFakeProps = { ...fakeProps, authError: { message: 'Error' } } 
    const { unmount, getByTestId } = renderSignin(authErrorFakeProps)
    expect(getByTestId('signin-error').textContent).toContain('Error')
    unmount()
    expect(authErrorFakeProps.clearAuthError).toHaveBeenCalled()
  })

})