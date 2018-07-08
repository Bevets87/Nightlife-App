import React from 'react'
import { Simulate } from 'react-testing-library'
import { renderWithRedux } from '../helpers'
import ErrorContainer from '../../../client/containers/ErrorContainer'


const fetchBarsFailure = {
  location: '',
  listings: {},
  ids: [],
  error: {
    fetch: { message: 'The bar search failed' },
    update: null
  }
}

const setUpTest = ({ initialState = {}, props = {} }) => {
  return renderWithRedux(<ErrorContainer {...props} />, { initialState })
}

describe('ErrorContainer', () => {


    

  it('renders fetch bars error from redux store', () => {
    const initialState = {
      bars: fetchBarsFailure
    }
    const { getByTestId, store } = setUpTest({ initialState })
    expect(store.getState().bars.error.fetch.message).toContain('The bar search failed')
    expect(getByTestId('error-message').textContent).toContain('The bar search failed')
  })

  it('can clear fetch bars error from redux store when Ok is clicked', () => {
    const initialState = { bars: fetchBarsFailure }
    const props = {
      reset: jest.fn()
    }
    const { getByText, store } = setUpTest({ initialState, props })

    Simulate.click(getByText('Ok'))

    expect(props.reset).toHaveBeenCalledTimes(1)
    expect(store.getState().bars.error.fetch).toBeNull()
  })
})