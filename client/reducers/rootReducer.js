import { combineReducers } from 'redux'
import attendeeReducer from './attendeeReducer'
import listingReducer from './listingReducer'
import userReducer from './userReducer'


export default combineReducers({
  attendeeReducer,
  listingReducer,
  userReducer
})
