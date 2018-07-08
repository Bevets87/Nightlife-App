import React from 'react'
import moxios from 'moxios'
import { renderWithRedux } from '../helpers'
import FetchingContainer from '../../../client/containers/FetchingContainer'


const locationSet = {
  location: 'Boston MA',
  listings: {},
  ids: [],
  error: {
    fetch: null,
    update: null
  }
}

const defaultProps = {
  onEnter: jest.fn((cb) => { cb() }),
  onExit: jest.fn((cb) => { cb() }),
  succeed: jest.fn(),
  fail: jest.fn()
}

const setUpTest = ({ initialState = {} }) => {
  return renderWithRedux(<FetchingContainer { ...defaultProps } />, { initialState })
}



describe('FetchingContainer', () => {

  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('can clearLocation() from redux store when mounted', () => {
    const initialState = { bars: locationSet }
    const { store } = setUpTest({ initialState })
    expect(defaultProps.onExit).toHaveBeenCalledTimes(1)

    expect(store.getState().bars.location).toBe('')
  })

  it('can dispatch fetchBarsSuccess() to the redux store when mounted', (done) => {
    const initialState = { bars: locationSet } 
    const { store } = setUpTest({ initialState })

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      expect(request.url).toMatch('/api/bars')
      request.respondWith({
        status: 200,
        response: [
          { id: 'one', name: 'Bar One', patrons: [], going: 0 },
          { id: 'two', name: 'Bar Two', patrons: [], going: 0 }
        ]
      })
        .then(() => {
          expect(defaultProps.succeed).toHaveBeenCalledTimes(1)
         
          expect(store.getState().bars.ids.length).toEqual(2)
          done()
        })
    })

  })

  it('can dispatch fetchBarsFailure() to the redux store when mounted', (done) => {
    const initialState = { bars: locationSet }
    const { store } = setUpTest({ initialState })

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      expect(request.url).toMatch('/api/bars')
      request.respondWith({
        status: 400,
        response: { message: 'Search failed' }
      })
        .then(() => {
          expect(defaultProps.fail).toHaveBeenCalledTimes(1)

          expect(store.getState().bars.error.fetch).toMatchObject({ message: 'Search failed' })
          done()
        })
    })
  })



})