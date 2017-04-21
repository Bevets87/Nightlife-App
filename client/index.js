import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import store from './store/configureStore'
import { getBars } from './actions/barActions'

import App from './functionalComponents/App'

import 'bootstrap/dist/css/bootstrap.min.css'
import './index.scss'

store.dispatch(getBars())

ReactDOM.render (
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('app'))
