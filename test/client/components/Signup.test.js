import React from 'react'
import { render, Simulate } from 'react-testing-library'
import Signup from '../../../client/components/Signup'

describe('Signup component', () => {

  const renderSignup = (props) => render(<Signup {...props} />)

  const changeValue = (value) => ({
    target: { value }
  })

  const fakeUser = {
    email: 'test@test.com',
    password: 'password',
    passwordConfirmation: 'password'
  }

  const fakeProps = {
    signupUser: jest.fn(),
    authError: null,
    clearAuthError: jest.fn(),
    authenticated: false,
    renderRedirect: jest.fn(() => null)
  }


  it('renders a proper signup form', () => {
    const { getByTestId } = renderSignup(fakeProps)
    expect(getByTestId('signup-title').textContent).toContain('Sign Up')

  })

  it('signs a user up when the submit button is clicked', () => {
    const { getByText, getByPlaceholderText } = renderSignup(fakeProps)
    Simulate.change(getByPlaceholderText('email'), changeValue(fakeUser.email))
    Simulate.change(getByPlaceholderText('password'), changeValue(fakeUser.password))
    Simulate.change(getByPlaceholderText('password confirmation'), changeValue(fakeUser.passwordConfirmation))
    Simulate.click(getByText('Submit'))
    expect(fakeProps.clearAuthError).toHaveBeenCalledTimes(1)
    expect(fakeProps.signupUser).toHaveBeenCalledTimes(1)
    expect(fakeProps.signupUser).toHaveBeenLastCalledWith(fakeUser)
  })

  

  it('shows no auth error when authError is null', () => {
    const { getByTestId } = renderSignup({ ...fakeProps, authError: null })
    expect(getByTestId('signup-error').textContent).toContain('')
  })

  it('shows an auth error when authError has a message prop', () => {
    const { getByTestId } = renderSignup({ ...fakeProps, authError: { message: 'There is a signup error' } })
    expect(getByTestId('signup-error').textContent).toContain('There is a signup error')
  })


  it('redirects to the landing page when a user is authenticated', () => {
    const authFakeProps = { ...fakeProps, authenticated: true }
    renderSignup(authFakeProps)
    expect(authFakeProps.renderRedirect).toHaveBeenCalledTimes(1)
    expect(authFakeProps.renderRedirect).toHaveBeenCalledWith('/')
  })

  it('clears any auth error when unmounting', () => {
    const authErrorFakeProps = { ...fakeProps, authError: { message: 'Error' } }
    const { unmount, getByTestId } = renderSignup(authErrorFakeProps)
    expect(getByTestId('signup-error').textContent).toContain('Error')
    unmount()
    expect(authErrorFakeProps.clearAuthError).toHaveBeenCalled()
  })
})