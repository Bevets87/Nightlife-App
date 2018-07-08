import { combineReducers } from 'redux'
import barReducer from './bar'
import authReducer from './auth'
import modeReducer from './mode'

export default combineReducers({
  bars: barReducer,
  auth: authReducer,
  mode: modeReducer 
})