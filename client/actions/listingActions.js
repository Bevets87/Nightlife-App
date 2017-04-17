import axios from 'axios'

export const SET_LISTINGS = 'SET_LISTINGS'
export const SET_SEARCH = 'SET_SEARCH'
export const SET_ERRORS = 'SET_ERRORS'

export function setListings(listings) {
  return {type: SET_LISTINGS, listings: listings}
}

export function setSearch() {
  return {type: SET_SEARCH}
}

export function setErrors(errors) {
  return {type: SET_ERRORS, errors: errors}
}

export const requestListings = (location) => {
  return function (dispatch) {
    dispatch(setSearch(true))
    return axios.post('/api', location)
    .then(
      response => {
        dispatch(setListings(response.data.listings))
      })
    .catch(
      error => {
        console.log(error.response.data)
        dispatch(setErrors(error.response.data))
      })
  }
}
