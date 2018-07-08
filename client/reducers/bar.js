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
} from '../actions/bar/types'

const InitialState = {
  location: '',
  listings: {},
  ids: [],
  error: {
    fetch: null,
    update: null 
  }
  
}


export default (state = InitialState, action) => {
  if (action.type === FETCH_BARS_SUCCESS) {
    return { 
      ...state, 
      listings: action.payload.reduce((hashTable, listing) => {
        listing.patrons = listing.patrons.reduce((hashTable, patron) => {
          hashTable[patron.email] = 1
          return hashTable
        }, {})
        hashTable[listing.id] = listing
        return hashTable
      }, {}),
      ids: action.payload.map(listing => listing.id) 
    }
  }
  if (action.type === FETCH_BARS_FAILURE) {
    return { ...state, error: { ...state.error, fetch: action.payload } }
  }
  if (action.type === CLEAR_FETCH_BARS_SUCCESS) {
    return { ...state, listings: {}, ids: [] }
  }
  if (action.type === CLEAR_FETCH_BARS_FAILURE) {
    return { ...state, error: { ...state.error, fetch: null } }
  }
  if (action.type === UPDATE_BAR_SUCCESS) {
    return { 
      ...state, 
      listings: {
        ...state.listings,
        [action.payload.yelp_id]: {
          ...state.listings[action.payload.yelp_id],
          going: action.payload.going,
          patrons: action.payload.patrons.reduce((hashTable, patron) => {
            hashTable[patron.email] = 1
            return hashTable
          }, {})
        }
      }
    }
  }
  if (action.type === UPDATE_BAR_FAILURE) {
    return { ...state, error: { ...state.error, update: action.payload } }
  }
  if (action.type === CLEAR_UPDATE_BAR_FAILURE) {
    return { ...state, error: { ...state.error, update: null } }
  }
  if (action.type === SET_LOCATION) {
    return { ...state, location: action.payload }
  }
  if (action.type === CLEAR_LOCATION) {
    return { ...state, location: '' }
  }

  return state
}
