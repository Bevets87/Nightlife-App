import axios from 'axios'

export const SET_BARS = 'SET_BARS'

export function setBars(bars) {
  return {type: SET_BARS, bars: bars}
}

export function getBars() {
  return function (dispatch) {
    return axios.get('/api/bars')
      .then(
        response => {
          dispatch(setBars(response.data.bars))
        })
      .catch(
        error => {
          alert(error.response.data)
        })
  }
}

export function createBar (bar) {
  return axios.post('/api/bars', bar)
}
