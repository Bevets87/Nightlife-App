import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import listingReducer from '../reducers/listingReducer'

const store = createStore(
  listingReducer,
  applyMiddleware(thunk)
)

export default store
