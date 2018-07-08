import React from 'react'
import { render, Simulate } from 'react-testing-library'
import Header from '../../../client/components/Header'

describe('Header component', () => {

  const createFakeProps = (overrides) => {
    const fakeProps = {
      authenticated: false,
      signoutUser: jest.fn(),
      redirect: jest.fn()
    }

    return { ...fakeProps, ...overrides }
  }
  
  const renderHeader = (props) => render(<Header {...props} />)
  
  it('renders properly in unauth mode', () => {
    const props = createFakeProps({ authenticated: false })
    const { getByText } = renderHeader(props)
    expect(getByText('Sign In')).toBeDefined()
    expect(getByText('NightLife')).toBeDefined()
  })

  it('reders properly in auth mode', () => {
    const props = createFakeProps({ authenticated: true })
    const { getByText } = renderHeader(props)
    expect(getByText('Sign Out')).toBeDefined()
    expect(getByText('NightLife')).toBeDefined()
  })

  it('redirects to signin page when Sign In button is clicked', () => {
    const props = createFakeProps({ authenticated: false })
    const { getByText } = renderHeader(props)
    Simulate.click(getByText('Sign In'))
    expect(props.redirect).toHaveBeenCalledTimes(1)
    expect(props.redirect).toHaveBeenCalledWith('/signin')
  })

  it('signs a user out when Sign Out button is clicked', () => {
    const props = createFakeProps({ authenticated: true })
    const { getByText } = renderHeader(props)
    Simulate.click(getByText('Sign Out'))
    expect(props.signoutUser).toHaveBeenCalledTimes(1)
    
  })

  it('redirects to the landing page when NightLife is clicked', () => {
    const props = createFakeProps({ authenticated: true })
    const { getByText } = renderHeader(props)
    Simulate.click(getByText('NightLife'))
    expect(props.redirect).toHaveBeenCalledTimes(1)
    expect(props.redirect).toHaveBeenCalledWith('/')
  
  })


})