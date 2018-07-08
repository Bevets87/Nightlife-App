import createAsyncActions from '../../../client/actions/bar/createAsync'

import {
  updateBarSuccess,
  updateBarFailure,
  fetchBarsFailure,
  fetchBarsSuccess,
  clearFetchBarsFailure,
  clearFetchBarsSuccess,
  clearUpdateBarFailure,
  setLocation,
  clearLocation
} from '../../../client/actions/bar'

import {
  UPDATE_BAR_SUCCESS,
  UPDATE_BAR_FAILURE, 
  CLEAR_UPDATE_BAR_FAILURE, 
  SET_LOCATION,
  CLEAR_LOCATION, 
  FETCH_BARS_SUCCESS,
  FETCH_BARS_FAILURE,
  CLEAR_FETCH_BARS_SUCCESS,
  CLEAR_FETCH_BARS_FAILURE, 
} from '../../../client/actions/bar/types'

describe('Bar actions', () => {

  const fetchBarsResponse = { 
    data: [
      { name: 'Bar One' },
      { name: 'Bar Two' }
    ] 
  }

  const fetchBarsError = {
    response: {
      data: {
        message: 'fetching bars failed'
      }
    }
  }

  const updateBarResponse = {
    data: {
      name: 'Updated Bar'
    }
  }

  const updateBarError = {
    response: {
      data: {
        message: 'updating failed' 
      }
    }
  }
  
  const succeedWithFetchBars= jest.fn((location) => Promise.resolve(fetchBarsResponse))
  const failWithFetchBars = jest.fn((user) => Promise.reject(fetchBarsError))
  
  const succeedWithBarUpdate = jest.fn((patron) => Promise.resolve(updateBarResponse)) 
  const failWithBarUpdate = jest.fn((patron) => Promise.reject(updateBarError))

  const createFakeAsyncActions = (overrides) => {
    const barApi = {
      fetchBars: jest.fn(),
      addPatron: jest.fn(),
      removePatron: jest.fn()
    }
    return createAsyncActions({ fetchBarsSuccess, fetchBarsFailure, updateBarSuccess, updateBarFailure }, { ...barApi, ...overrides })
  }


  it('creates an action of type UPDATE_BAR_SUCCESS and payload bar', () => {
    const bar = { name: 'Test Bar' }
    const action = updateBarSuccess(bar)
    expect(action.type).toBe(UPDATE_BAR_SUCCESS)
    expect(action.payload).toMatchObject({ name: 'Test Bar' })
  })

  it('creates an action of type UPDATE_BAR_FAILURE and payload error', () => {
    const error = { message: 'failed updating' }
    const action = updateBarFailure(error)
    expect(action.type).toBe(UPDATE_BAR_FAILURE)
    expect(action.payload).toMatchObject({ message: 'failed updating' })
  })

  it('creates an action of type FETCH_BARS_SUCCESS and payload bars', () => {
    const bars = [ { name: 'Test Bar One'}, { name: 'Test Bar Two' } ]
    const action = fetchBarsSuccess(bars)
    expect(action.type).toBe(FETCH_BARS_SUCCESS)
    expect(action.payload).toMatchObject([{ name: 'Test Bar One' }, { name: 'Test Bar Two' }])
  })

  it('creates an action of type FETCH_BARS_FAILURE and payload error', () => {
    const error = { message: 'failed fetching bars' }
    const action = fetchBarsFailure(error)
    expect(action.type).toBe(FETCH_BARS_FAILURE)
    expect(action.payload).toMatchObject({ message: 'failed fetching bars' })
  })

  it('creates an action of type SET_LOCATION and payload location', () => {
    const location = 'Boston Ma'
    const action = setLocation(location)
    expect(action.type).toBe(SET_LOCATION)
    expect(action.payload).toBe('Boston Ma')
  })

  it('creates an action of type CLEAR_LOCATION', () => {
    const action = clearLocation()
    expect(action.type).toBe(CLEAR_LOCATION)
    
  })

  it('creates an action of type CLEAR_FETCH_BARS_SUCCESS', () => {
    const action = clearFetchBarsSuccess()
    expect(action.type).toBe(CLEAR_FETCH_BARS_SUCCESS)
  })

  it('creates an action of type CLEAR_UPDATE_BAR_FAILURE', () => {
    const action = clearUpdateBarFailure()
    expect(action.type).toBe(CLEAR_UPDATE_BAR_FAILURE)
  })

  it('creates an action of type CLEAR_FETCH_BARS_FAILURE', () => {
    const action = clearFetchBarsFailure()
    expect(action.type).toBe(CLEAR_FETCH_BARS_FAILURE)
  })

  it('creates an action of type CLEAR_LOCATION', () => {
    const action = clearLocation()
    expect(action.type).toBe(CLEAR_LOCATION)
  })

  it('dispatches an action creator of fetchBarsSuccess() when fetchBars succeeds', (done) => {
    const { fetchBars } = createFakeAsyncActions({ fetchBars: succeedWithFetchBars })
    const location = jest.mock
    const dispatch = jest.fn()
    const expectedPayload = [
      { name: 'Bar One' },
      { name: 'Bar Two' }
    ] 
    fetchBars(location)(dispatch)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1)
        expect(dispatch).toHaveBeenCalledWith(fetchBarsSuccess(expectedPayload))
        done()
      }) 
  })

  it('dispatches an action creator of fetchBarsFailure() when fetchBars fails', (done) => {
    const { fetchBars } = createFakeAsyncActions({ fetchBars: failWithFetchBars })
    const location = jest.mock 
    const dispatch = jest.fn() 
    const expectedPayload = { message: 'fetching bars failed' }
    fetchBars(location)(dispatch)
      .catch(() => {
        expect(dispatch).toHaveBeenCalledTimes(1)
        expect(dispatch).toHaveBeenCalledWith(fetchBarsFailure(expectedPayload))
        done()
      })
  })

  it('dispatches an action creator of updateBarSuccess() when addPatron succeeds', (done) => {
    const { addPatron } = createFakeAsyncActions({ addPatron: succeedWithBarUpdate })
    const patron = jest.mock 
    const dispatch = jest.fn() 
    const expectedPayload = { name: 'Updated Bar' }
    addPatron(patron)(dispatch)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1)
        expect(dispatch).toHaveBeenCalledWith(updateBarSuccess(expectedPayload))
        done()
      })
  })

  it('dispatches an action creator of updateBarSuccess() when removePatron succeeds', (done) => { 
    const { removePatron } = createFakeAsyncActions({ removePatron: succeedWithBarUpdate })
    const patron = jest.mock
    const dispatch = jest.fn()
    const expectedPayload = { name: 'Updated Bar' }
    removePatron(patron)(dispatch)
      .then(() => {
        expect(dispatch).toHaveBeenCalledTimes(1)
        expect(dispatch).toHaveBeenCalledWith(updateBarSuccess(expectedPayload))
        done()
      })
  })

  it('dispatches an action creator of updateBarFailure() when addPatron fails', (done) => { 
    const { addPatron } = createFakeAsyncActions({ addPatron: failWithBarUpdate })
    const patron = jest.mock 
    const dispatch = jest.fn() 
    const expectedPayload = { message: 'updating failed' }
    addPatron(patron)(dispatch)
      .catch(() => {
        expect(dispatch).toHaveBeenCalledTimes(1)
        expect(dispatch).toHaveBeenCalledWith(updateBarFailure(expectedPayload))
        done()
      })
  })

  it('dispatches an action creator of updateBarFailure() when removePatron fails', (done) => { 
    const { removePatron } = createFakeAsyncActions({ removePatron: failWithBarUpdate })
    const patron = jest.mock
    const dispatch = jest.fn()
    const expectedPayload = { message: 'updating failed' }
    removePatron(patron)(dispatch)
      .catch(() => {
        expect(dispatch).toHaveBeenCalledTimes(1)
        expect(dispatch).toHaveBeenCalledWith(updateBarFailure(expectedPayload))
        done()
      })
  
  
  })



})

