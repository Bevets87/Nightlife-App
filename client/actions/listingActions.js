import axios from 'axios'

export const SET_LISTINGS = 'SET_LISTINGS'
export const GET_LISTINGS = 'GET_LISTINGS'
export const SET_LISTING_ERRORS = 'SET_LISTING_ERRORS'

export function setListings(listings) {
  return {type: SET_LISTINGS, listings: listings}
}

export function getListings(isFetching) {
  return {type: GET_LISTINGS, isFetching: isFetching}
}

export function setListingErrors(errors) {
  return {type: SET_LISTING_ERRORS, errors }
}

export const requestListings = (location) => {
  return function (dispatch) {
    dispatch(getListings(true))
    return axios.post('/api', location)
    .then(
      response => {
        if(response.data.listings) {
          dispatch(getListings(false))
          dispatch(setListings(response.data.listings))
          dispatch(setListingErrors({}))
        } else if(response.data.error) {
          response = JSON.parse(response.data.error)
          dispatch(getListings(false))
          dispatch(setListingErrors(response))
        }
      }
    )
  }
}
