import axios from 'axios'

export const SET_LISTINGS = 'SET_LISTINGS'
export const SET_LISTING_SEARCH = 'SET_LISTING_SEARCH'
export const SET_LISTING_ERRORS = 'SET_LISTING_ERRORS'

export function setListings(listings) {
  return {type: SET_LISTINGS, listings: listings}
}

export function setListingSearch() {
  return {type: SET_LISTING_SEARCH}
}

export function setListingErrors(listingErrors) {
  return {type: SET_LISTING_ERRORS, listingErrors: listingErrors}
}

export const requestListings = (location) => {
  return function (dispatch) {
    dispatch(setListingSearch())
    return axios.post('/api', location)
    .then(
      response => {
        dispatch(setListings(response.data.listings))
      })
    .catch(
      error => {
        dispatch(setListingErrors(error.response.data))
      })
  }
}
