import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import yelpApiReducer from '../reducers/yelpApiReducer'

const store = createStore(
  yelpApiReducer,
  applyMiddleware(thunk)
)

export default store
