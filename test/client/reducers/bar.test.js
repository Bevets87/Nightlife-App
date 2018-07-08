import barReducer from '../../../client/reducers/bar'
import {
  FETCH_BARS_SUCCESS,
  FETCH_BARS_FAILURE,
  CLEAR_FETCH_BARS_SUCCESS,
  CLEAR_FETCH_BARS_FAILURE,
  UPDATE_BAR_SUCCESS,
  UPDATE_BAR_FAILURE,
  CLEAR_UPDATE_BAR_FAILURE,
  SET_LOCATION,
  CLEAR_LOCATION
} from '../../../client/actions/bar/types'

describe('barReducer', () => {

  const InitialState = {
    location: '',
    listings: {},
    ids: [],
    error: {
      fetch: null,
      update: null
    }

  }

  const FetchBarsSuccessState = {
    ...InitialState,
    listings: {
      'one': { id: 'one', name: 'bar-one', patrons: { 'test1@test.com': 1 }, going: 1 },
      'two': { id: 'two', name: 'bar-two', patrons: { 'test2@test.com': 1 }, going: 1 }
    },
    ids: [ 'one', 'two' ],
        
  }

  const FetchBarsFailureState = {
    ...InitialState,
    error: {
      fetch: 'fetch error',
      update: null
    }
  }

  const UpdateBarSuccessState = {
    ...InitialState,
    listings: {
      'one': { id: 'one', name: 'bar-one', patrons: { 'test1@test.com': 1, 'test3@test.com': 1 }, going: 2 },
      'two': { id: 'two', name: 'bar-two', patrons: { 'test2@test.com': 1 }, going: 1 }
    },
    ids: ['one', 'two']
      
  }

  const UpdateBarFailureState = {
    ...FetchBarsSuccessState,
    error: {
      fetch: null,
      update: 'update error'
    }
  }

    
  const LocationSetState = {
    ...InitialState,
    location: 'Boston MA',
  }

   

  it('should return the initial state', () => {
    const state = undefined
    const action = { type: null }
    expect(barReducer(state, action)).toMatchObject(InitialState)
  })

  it('can handle FETCH_BARS_SUCCESS', () => {
    const bars = [
      { id: 'one', name: 'bar-one', patrons: [ { email: 'test1@test.com' } ], going: 1 },
      { id: 'two', name: 'bar-two', patrons: [ { email: 'test2@test.com' } ], going: 1 }
    ]
    const state = undefined
    const action = { type: FETCH_BARS_SUCCESS, payload: bars }
    expect(barReducer(state, action)).toMatchObject(FetchBarsSuccessState)
  })

  it('can handle FETCH_BARS_FAILURE', () => {
    const state = undefined
    const action = { type: FETCH_BARS_FAILURE, payload: 'fetch error' }
    expect(barReducer(state, action)).toMatchObject(FetchBarsFailureState)
  })

  it('can handle CLEAR_FETCH_BARS_SUCCESS', () => {
    const state = FetchBarsSuccessState
    const action = { type: CLEAR_FETCH_BARS_SUCCESS }
    expect(barReducer(state, action)).toMatchObject(InitialState)
  })

  it('can handle CLEAR_FETCH_BARS_FAILURE', () => {
    const state = FetchBarsFailureState
    const action = { type: CLEAR_FETCH_BARS_FAILURE }
    expect(barReducer(state, action)).toMatchObject(InitialState)
  })

  it('can handle UPDATE_BAR_SUCCESS', () => {
    const bar = {
      yelp_id: 'one',
      going: 2,
      patrons: [
        { email: 'test1@test.com' },
        { email: 'test3@test.com' }
      ]
    }
    const state = FetchBarsSuccessState
    const action = { type: UPDATE_BAR_SUCCESS, payload: bar }
    expect(barReducer(state, action)).toMatchObject(UpdateBarSuccessState)
  })

  it('can handle UPDATE_BAR_FAILURE', () => {
    const state = FetchBarsSuccessState
    const action = { type: UPDATE_BAR_FAILURE, payload: 'update error' }
    expect(barReducer(state, action)).toMatchObject(UpdateBarFailureState)
  })

  it('can handle CLEAR_UPDATE_BAR_FAILURE', () => {
    const state = UpdateBarFailureState
    const action = { type: CLEAR_UPDATE_BAR_FAILURE }
    expect(barReducer(state, action)).toMatchObject(FetchBarsSuccessState)
  })

  it('can handle SET_LOCATION', () => {
    const state = undefined 
    const action = { type: SET_LOCATION, payload: 'Boston MA'}
    expect(barReducer(state, action)).toMatchObject(LocationSetState)
  })

  it('can handle CLEAR_LOCATION', () => {
    const state = LocationSetState
    const action = { type: CLEAR_LOCATION }
    expect(barReducer(state, action)).toMatchObject(InitialState)
  })



})


