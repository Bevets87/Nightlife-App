import axios from 'axios'

export const SET_YELP_LISTINGS = 'SET_YELP_LISTINGS'

export function setYelpListings(listings) {
  return {type: SET_YELP_LISTINGS, listings: listings}
}

export const getYelpListings = (location) => {
  return function (dispatch) {
    return axios.post('/api', location)
      .then(response => {
        dispatch(setYelpListings(response.data.listings))
      })
      .catch(error => { return error })
  }
}
