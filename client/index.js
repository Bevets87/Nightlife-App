import React from 'react'
import { render } from 'react-dom'

import { BrowserRouter, Route } from 'react-router-dom'

import Home from './components/Home'

import 'bootstrap/dist/css/bootstrap.min.css'
import './index.scss'

render(
  <BrowserRouter>
    <Route path='/' component={Home} />
  </BrowserRouter>, document.getElementById('app')
)
