import React from 'react'
import ReactDOM from 'react-dom'
import { applyMiddleware, createStore } from 'redux'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import reducers from './reducers'
import reduxThunk from 'redux-thunk'
import {  getMe  } from './actions/auth'

import App from './components/App'

import './styles/index.scss'
import './index.html'

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore)
const store = createStoreWithMiddleware(reducers)

store.dispatch(getMe())
  .then(() => {
    ReactDOM.render(
      <Provider store={store} >
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
      ,
      document.getElementById('app')
    )
  })









