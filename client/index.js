import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import store from './store/configureStore'

import App from './statefulComponents/App'

import 'bootstrap/dist/css/bootstrap.min.css'
import './index.scss'

ReactDOM.render (
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('app'))
