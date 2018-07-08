import React from 'react'
import moxios from 'moxios'
import { Simulate } from 'react-testing-library'
import { renderWithReduxAndRouter, withRoute } from '../helpers'
import createTree from '../../../client/utils/createTree'
import BarsContainer from '../../../client/containers/BarsContainer'
import { string, number, object, func } from 'prop-types'

const MockBar = ({ addPatron, removePatron, requireAuth, isGoing, patrons, name, going, id }) => {
  isGoing = isGoing(patrons)
  return(
    <div>
      <span data-testid={`${name}-name`}>{name}</span>
      <span data-testid={`${name}-going`}>{going}</span>
      <div  data-testid={`${name}-patrons`}>
        {Object.keys(patrons).map((email, i) => <span key={i} data-testid={`${name}-patron-${i}`}>{email}</span>)}
      </div>
      <button 
        data-testid={`${name}-button`} 
        onClick={requireAuth(() => isGoing ? removePatron(id) : addPatron(id))}
      >
        {isGoing ? 'Leave' : 'Go'}
      </button>
    </div>
  )
}

MockBar.propTypes = { addPatron: func, removePatron: func, requireAuth: func, isGoing: func, patrons: object, name: string, going: number, id: string }


const MockBarsContainer = createTree(BarsContainer, MockBar)
const MockBarsContainerWithRoute = withRoute(MockBarsContainer)


const authenticated = {
  authenticated: true,
  email: 'test@test.com',
  error: null
    
}
const fetchBarsSuccess = {
  location: '',
  listings: {
    'one': { id: 'one', name: 'bar-one', patrons: { 'test1@test.com': 1 }, going: 1 },
    'two': { id: 'two', name: 'bar-two', patrons: { [authenticated.email]: 1 }, going: 1 }
  },
  ids: ['one', 'two'],
  error: {
    fetch: null,
    update: null
  }
}

const setUpTest = ({initialState = {}, route = '/', props = {} }) => {
  return renderWithReduxAndRouter(<MockBarsContainerWithRoute path={route} { ...props } />, { initialState }, { route })
}


describe('BarsContainer', () => {
  beforeEach(() => {
    localStorage.removeItem('token')
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('renders bars from the redux store', () => {
    const initialState = { bars: fetchBarsSuccess}
    const { getByTestId, store } = setUpTest({ initialState })
    const { bars } = store.getState()
    expect(bars.listings['one'].name).toContain('bar-one')
    expect(bars.listings['two'].name).toContain('bar-two')
    expect(getByTestId('bar-one-name').textContent).toContain('bar-one')
    expect(getByTestId('bar-two-name').textContent).toContain('bar-two')
    
  })

  it('redirects user to /signin when not authenticated and Go button is clicked', () => {
    const initialState = {
      bars: fetchBarsSuccess
    }
    const { getByTestId, history } = setUpTest({ initialState })
    Simulate.click(getByTestId('bar-one-button'))
    expect(history.location.pathname).toContain('/signin')
  })


  it('adds a patron to a bar from the redux store when auth user clicks Go button', (done) => {
    const initialState = { bars: fetchBarsSuccess, auth: authenticated }
    const updatedBar =  { yelp_id: 'one', name: 'bar-one', patrons: [ { email: 'test1@test.com' }, { email: authenticated.email } ], going: 2 }
    localStorage.setItem('token', 'token')
    const { getByTestId, store } = setUpTest({ initialState })
    
    
    Simulate.click(getByTestId('bar-one-button'))

    moxios.wait(() => {
      let request = moxios.requests.mostRecent()
      expect(request.url).toMatch('/api/bars/patron')
      request.respondWith({
        status: 200,
        response: updatedBar
      })
        .then(() => {
          expect(getByTestId('bar-one-patrons').children.length).toEqual(2)
          expect(getByTestId('bar-one-patron-1').textContent).toContain(authenticated.email)
          expect(getByTestId('bar-one-button').textContent).toContain('Leave')
          done()
        })
          
    })

  })
      
  it('removes a patron from a bar in the redux store when auth user clicks Leave', (done) => {
    const initialState = { bars: fetchBarsSuccess, auth: authenticated }
    const updatedBar = { yelp_id: 'two', name: 'bar-two', patrons: [], going: 0 }
    localStorage.setItem('token', 'token')
    const { getByTestId } = setUpTest({ initialState })

    Simulate.click(getByTestId('bar-two-button'))

    moxios.wait(() => {
      let request = moxios.requests.mostRecent()
      expect(request.url).toMatch('/api/bars/patron/remove')
      request.respondWith({
        status: 200,
        response: updatedBar
      })
        .then(() => {
          expect(getByTestId('bar-two-patrons').children.length).toEqual(0)
          expect(getByTestId('bar-two-button').textContent).toContain('Go')
          done()
        })
    })
  })
  
  it('can clear bars from the redux store when new search is clicked', () => {
    const initialState = { bars: fetchBarsSuccess }
    const props = { reset: jest.fn() }
    const { getByText, store } = setUpTest({ initialState, props })
    Simulate.click(getByText('new search'))

    expect(props.reset).toHaveBeenCalledTimes(1)
    expect(store.getState().bars.listings).toMatchObject({})
    expect(store.getState().bars.ids.length).toEqual(0)
  })
    
  
   




})