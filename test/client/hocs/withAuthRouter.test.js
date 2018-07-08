import React from 'react'
import { Simulate } from 'react-testing-library'
import { renderWithReduxAndRouter, withRoute } from '../helpers'
import { func, bool } from 'prop-types'
import withAuthRouter from '../../../client/hocs/withAuthRouter'

const RedirectView = ({
  authenticated, 
  redirect, 
  requireAuth, 
  renderRedirect
}) => {

  const redirectToHome = () => { redirect('/home') }
  const redirectToProtected = () => { redirect('/protected') }
  return(
    <div>
      <button onClick={requireAuth(redirectToProtected)}>Protected Page</button>
      <button onClick={redirectToHome}>Home Page</button>
      {authenticated ? null : renderRedirect('/signin')}
    </div>
  )
}

RedirectView.propTypes = {
  authenticated: bool,
  redirect: func,
  requireAuth: func,
  renderRedirect: func
}

const RedirectContainerWithRoute = withRoute(withAuthRouter(RedirectView))

const setUpTest = ({ initialState = {}, route = '/' }) => {
  return renderWithReduxAndRouter(<RedirectContainerWithRoute path={route} />, { initialState }, { route })
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



describe('withAuthRouter', () => {

  it('can redirect() to /home when Home Page is clicked', () => {
    const initialState = { auth: authState }
    const { getByText, history } = setUpTest({ initialState })
    Simulate.click(getByText('Home Page'))

    expect(history.location.pathname).toMatch('/home')
  })

  it('can requireAuth() and redirect() to /protected when auth user clicks Protected Page', () => {
    const initialState = { auth: authState }
    const { getByText, history } = setUpTest({ initialState })
    Simulate.click(getByText('Protected Page'))

    expect(history.location.pathname).toMatch('/protected')
  })

  it('can renderRedirect() when Component mounts', () => {
    const initialState = { auth: unauthState }
    const { history } = setUpTest({ initialState })


    expect(history.location.pathname).toMatch('/signin')
  })

  

})
  


