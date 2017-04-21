import { combineReducers } from 'redux'
import barReducer from './barReducer'
import listingReducer from './listingReducer'
import userReducer from './userReducer'


export default combineReducers({
  barReducer,
  listingReducer,
  userReducer
})
