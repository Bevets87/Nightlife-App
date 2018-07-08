import React from 'react'
import { func } from 'prop-types'
import { Simulate } from 'react-testing-library'
import { renderWithRedux } from '../helpers'
import createFetchMachine from '../../../client/utils/createFetchMachine'

const MockFetch = ({ fetch }) => <div data-testid="fetch"><button onClick={fetch}>Fetch</button></div>
MockFetch.propTypes = { fetch: func }
const MockFetching = ({ fail, succeed }) => <div data-testid="fetching"><button onClick={succeed}>Succeed</button><button onClick={fail}>Fail</button></div>
MockFetching.propTypes = { fail: func, succeed: func }
const MockSuccess= ({ reset }) => <div data-testid="success"><button onClick={reset}>Reset</button></div>
MockSuccess.propTypes = { reset: func }
const MockFailure = ({ reset }) => <div data-testid="failure"><button onClick={reset}>Reset</button></div>
MockFailure.propTypes = { reset: func }

const FetchMachine = createFetchMachine({
  Fetch: MockFetch,
  Fetching: MockFetching,
  Success: MockSuccess,
  Failure: MockFailure
})

const renderFetchMachine = ({ initialState = {}, props = {} }) => {
  return renderWithRedux(<FetchMachine {...props} />, { initialState })
}




describe('createFetchMachine util function', () => {
  it('can fetch() and transition from fetchMode to fetchingMode', () => {
    const initialState = { mode: 'fetch' }
    const { getByText, getByTestId } = renderFetchMachine({ initialState })
    expect(getByTestId('fetch')).toBeDefined()
    Simulate.click(getByText('Fetch'))
    expect(getByTestId('fetching')).toBeDefined() 
  })

  it('can succeed() and transition from fetchingMode to successMode', () => {
    const initialState = { mode: 'fetching' }
    const { getByText, getByTestId } = renderFetchMachine({ initialState })
    expect(getByTestId('fetching')).toBeDefined()
    Simulate.click(getByText('Succeed'))
    expect(getByTestId('success')).toBeDefined() 

  })

  it('can fail() and transition from fetchingMode to failureMode', () => {
    const initialState = { mode: 'fetching' }
    const { getByText, getByTestId } = renderFetchMachine({ initialState })
    expect(getByTestId('fetching')).toBeDefined()
    Simulate.click(getByText('Fail'))
    expect(getByTestId('failure')).toBeDefined() 

  })

  it('can reset() and transition from successMode/failureMode to fetchMode', () => {
    const initialState = { mode: 'success' }
    const { getByText, getByTestId } = renderFetchMachine({ initialState })
    expect(getByTestId('success')).toBeDefined()
    Simulate.click(getByText('Reset'))
    expect(getByTestId('fetch')).toBeDefined() 

  })
})
