import { SET_LISTINGS, SET_LISTING_SEARCH, SET_LISTING_ERRORS } from '../actions/listingActions'

const DEFAULT_STATE = {
  listings: [],
  isFetching: false,
  errors: null
}

const setListings = (state, action) => {
  return Object.assign(
    {},
    state,
    {
      listings: action.listings,
      isFetching: false,
      errors: null
    }
  )
}

const setListingSearch = (state) => {
  return Object.assign(
    {},
    state,
    {
      listings: [],
      isFetching: true,
      errors: null
    }
  )
}

const setListingErrors = (state, action) => {
  return Object.assign(
    {},
    state,
    {
      listings: [],
      isFetching: false,
      listingErrors: action.listingErrors
    }
  )
}



const listingReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
  case SET_LISTING_SEARCH:
    return setListingSearch(state, action)
  case SET_LISTINGS:
    return setListings(state, action)
  case SET_LISTING_ERRORS:(state, action)
    return setListingErrors(state, action)
  default:
    return state
  }
}

export default listingReducer
