import React from 'react'
import moxios from 'moxios'
import { Simulate, wait } from 'react-testing-library'
import { renderWithReduxAndRouter, withRoute } from '../helpers'
import FetchMachineContainer from '../../../client/containers/FetchMachineContainer'


const onChangeValue = (value) => ({
  target: { value }
})

const FetchMachineContainerWithRoute = withRoute(FetchMachineContainer)

const setUpTest = ({ initialState = {}, route = '/', props = {} }) => {
  return renderWithReduxAndRouter(<FetchMachineContainerWithRoute path={route} {...props} />, { initialState }, { route })
}


const mockBars = [
  {
    id: 'one',
    name: 'BarOne',
    patrons: [],
    going: 0,
    image_url: '',
    rating: 4.5
  },
  {
    id: 'two',
    name: 'BarTwo',
    patrons: [],
    going: 0,
    image_url: '',
    rating: 4.5
  },
  {
    id: 'three',
    name: 'BarThree',
    patrons: [],
    going: 0,
    image_url: '',
    rating: 4.5
  }
]

describe('FetchMachineContainer', () => {

  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })


  it('renders properly on init mount', () => {
        
    const { getByTestId } = setUpTest({ })
       
    expect(getByTestId('search-bar-title').textContent).toContain('Have Some Fun Tonight!')
       
  })

  it('can fetch() then succeed() then reset()', (done) => {
    const { getByText, getByPlaceholderText, getByTestId, queryByText, container, store } = setUpTest({ })

    Simulate.change(getByPlaceholderText('search by location'), onChangeValue('Boston MA'))
    Simulate.click(container.querySelector('.search-icon'))

    moxios.wait(() => {
      let request = moxios.requests.mostRecent()
      expect(request.url).toMatch('/api/bars')
      expect(getByTestId('spinner')).toBeDefined()
      request.respondWith({
        status: 200,
        response: mockBars
      })
        .then(() => {
          expect(getByTestId('bars').children.length).toEqual(3)
          expect(store.getState().bars.ids.length).toEqual(3)
          Simulate.click(getByText('new search'))
          return wait(() => expect(queryByText('new search')).toBeNull())
        })
        .then(() => {
          expect(getByTestId('search-bar-title').textContent).toContain('Have Some Fun Tonight!')
          done()
        })
    })
  })

  it('can fetch() then fail() then reset()', (done) => {
    const { getByText, getByPlaceholderText, getByTestId, queryByText, container, store } = setUpTest({})

    Simulate.change(getByPlaceholderText('search by location'), onChangeValue('fejaofjeagogejage'))
    Simulate.click(container.querySelector('.search-icon'))

    moxios.wait(() => {
      let request = moxios.requests.mostRecent()
      expect(request.url).toMatch('/api/bars')
      expect(getByTestId('spinner')).toBeDefined()
      request.respondWith({
        status: 400,
        response: { message: 'Yelp search failed' }
      })
        .then(() => {
          expect(getByTestId('error-message').textContent).toContain('Yelp search failed')
          expect(store.getState().bars.error.fetch.message).toContain('Yelp search failed')
          Simulate.click(getByText('Ok'))
          return wait(() => expect(queryByText('Ok')).toBeNull())
        })
        .then(() => {
          expect(getByTestId('search-bar-title').textContent).toContain('Have Some Fun Tonight!')
          done()
        })
    })

  })


})