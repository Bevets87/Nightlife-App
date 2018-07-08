import React from 'react'
import { Simulate, wait } from 'react-testing-library'
import { renderWithReduxAndRouter, withRoute } from '../helpers'
import HeaderContainer from '../../../client/containers/HeaderContainer'

const HeaderContainerWithRoute = withRoute(HeaderContainer)

const renderHeaderContainer = ({ initialState = {}, route = '/', props = {} }) => {
  return renderWithReduxAndRouter(<HeaderContainerWithRoute path={route} {...props} />, { initialState }, { route })
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


describe('Header Container', () => {

  beforeEach(() => {
    localStorage.removeItem('token')
  })

  it('can navigate to / when any user clicks NightLife logo', () => {
    const initialState = { auth: unauthState }
    const { getByText, history } = renderHeaderContainer({ initialState })
    Simulate.click(getByText('NightLife'))

    expect(history.location.pathname).toMatch('/')
  })
  it('can navigate to /signin when unauth user clicks Sign In', () => {
    const initialState = { auth: unauthState }
    const { getByText, history } = renderHeaderContainer({ initialState })
    Simulate.click(getByText('Sign In'))

    expect(history.location.pathname).toMatch('/signin')
  })

  it('can signoutUser() when auth user clicks Sign Out', (done) => {
    const initialState = { auth: authState }  
    const token = 'secrettoken'
    localStorage.setItem('token', token)
    const { getByText, queryByText, store } = renderHeaderContainer({ initialState })

    expect(store.getState().auth.authenticated).toBeTruthy()
    expect(store.getState().auth.email).toContain('test@test.com')

    Simulate.click(getByText('Sign Out'))

    wait(() => expect(queryByText('Sign Out')).toBeNull())
      .then(() => {
        expect(localStorage.getItem('token')).toBeUndefined()
        expect(store.getState().auth.authenticated).toBeFalsy()
        expect(store.getState().auth.email).toBeNull()
        done()
      })

  })

 
})