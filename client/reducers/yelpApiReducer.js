import { SET_YELP_LISTINGS } from '../actions/yelpApiActions'

const setYelpListings = (state, action) => {
  return Object.assign({}, state, {listings: action.listings})
}

const yelpApiReducer = (state = {listings: []}, action) => {
  switch (action.type) {
  case SET_YELP_LISTINGS:
    return setYelpListings(state, action)
  default:
    return state
  }
}

export default yelpApiReducer
