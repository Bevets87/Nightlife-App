import React from 'react'
import { render } from 'react-testing-library'
import Fetching from '../../../client/components/Fetching'

describe('Fetching component', () => {



  const createFakeProps = (overrides) => {
    const props = { 
      searchTerm: 'Boston MA',
      fail: jest.fn(),
      onEnter: jest.fn((cb) => {cb() }),
      onExit: jest.fn((cb) => { cb() }),
      clearSearchTerm: jest.fn(),
      succeed: jest.fn()
    }

    return { ...props, ...overrides }
  }

  class Resolve {
    then(cb) {
      cb()
      return this
    }
    catch() {

    }
  }

  class Reject {
    then() {
      return this
    }
    catch(cb) {
      cb()
    }
  }

  const resolve = jest.fn(() => new Resolve())
  const reject = jest.fn(() => new Reject())
  const renderFetching = (props) => render(<Fetching {...props} />)

  it('renders a loading spinner when it mounts', () => {
    const props = createFakeProps({ fetchData: resolve })
    const { getByTestId } = renderFetching(props)
    expect(getByTestId('spinner')).toBeDefined()
    
    
  })

  it('fetches bars based on location when onEnter is called', () => {
    const props = createFakeProps({ fetchData: reject })
    renderFetching(props)
    expect(props.onEnter).toHaveBeenCalled()
    expect(props.fetchData).toHaveBeenCalledTimes(1)
    expect(props.fetchData).toHaveBeenCalledWith(props.searchTerm)
    
  })
  
  it('fails', () => {
    const props = createFakeProps({ fetchData: reject })
    renderFetching(props)
    
    expect(props.fail).toHaveBeenCalledTimes(1)
    
  })

  it('succeeds', () => {
    const props = createFakeProps({ fetchData: resolve })
    renderFetching(props)
    expect(props.fetchData).toHaveBeenCalled()
    expect(props.fetchData).toHaveBeenCalledWith(props.searchTerm)
    expect(props.succeed).toHaveBeenCalledTimes(1)
    
  })

  it('calls clearSearchTerm when onExit is called', () => {
    const props = createFakeProps({ fetchData: reject })
    renderFetching(props)
    expect(props.onExit).toHaveBeenCalledTimes(1)
    expect(props.clearSearchTerm).toHaveBeenCalledTimes(1)

  })



})

