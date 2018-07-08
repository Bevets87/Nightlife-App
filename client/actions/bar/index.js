import barApi from '../../utils/barApi'
import createAsyncActions from './createAsync'

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
} from './types'

export const updateBarSuccess = (bar) => ({
  type: UPDATE_BAR_SUCCESS,
  payload: bar
})

export const updateBarFailure = (error) => ({
  type: UPDATE_BAR_FAILURE,
  payload: error
})

export const fetchBarsSuccess = (bars) => ({
  type: FETCH_BARS_SUCCESS,
  payload: bars
})

export const fetchBarsFailure = (error) => ({
  type: FETCH_BARS_FAILURE,
  payload: error
})

export const clearFetchBarsSuccess = () => ({
  type: CLEAR_FETCH_BARS_SUCCESS
})

export const clearFetchBarsFailure = () => ({
  type: CLEAR_FETCH_BARS_FAILURE
})

export const clearUpdateBarFailure = () => ({
  type: CLEAR_UPDATE_BAR_FAILURE
})

export const setLocation = (location) => ({
  type: SET_LOCATION,
  payload: location
})

export const clearLocation = () => ({
  type: CLEAR_LOCATION
})

export const {
  fetchBars,
  addPatron,
  removePatron
} = createAsyncActions({ fetchBarsSuccess, fetchBarsFailure, updateBarSuccess, updateBarFailure }, barApi)





