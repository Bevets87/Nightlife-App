import { SET_LISTINGS, GET_LISTINGS, SET_LISTING_ERRORS } from '../actions/listingActions'

const DEFAULT_STATE = {
  listings: [],
  isFetching: false,
  errors: {}
}

const setListings = (state, action) => {
  return Object.assign({}, state, {listings: action.listings})
}

const getListings = (state, action) => {
  return Object.assign({}, state, {isFetching: action.isFetching})
}

const setListingErrors = (state, action) => {
  return Object.assign({}, state, {errors: action.errors})
}

const listingReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
  case GET_LISTINGS:
    return getListings(state, action)
  case SET_LISTINGS:
    return setListings(state, action)
  case SET_LISTING_ERRORS:
    return setListingErrors(state, action)
  default:
    return state
  }
}

export default listingReducer
