import { SET_LISTINGS, SET_SEARCH, SET_ERRORS } from '../actions/listingActions'

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

const setSearch = (state) => {
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

const setErrors = (state, action) => {
  return Object.assign(
    {},
    state,
    {
      listings: [],
      isFetching: false,
      errors: action.errors
    }
  )
}



const listingReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
  case SET_SEARCH:
    return setSearch(state, action)
  case SET_LISTINGS:
    return setListings(state, action)
  case SET_ERRORS:(state, action)
    return setErrors(state, action)
  default:
    return state
  }
}

export default listingReducer
