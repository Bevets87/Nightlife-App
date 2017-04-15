import React from 'react'

import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navbar from './Navbar'
import VideoBackground from './VideoBackground'
import Home from './Home'
import Login from './Login'
import Register from './Register'

const App = () => (
  <Router>
    <div>
      <Navbar />
      <VideoBackground />
      <Route exact path='/' component={Home} />
      <Route path='/login' component={Login} />
      <Route path='/register' component={Register} />
    </div>
  </Router>
  )


export default App
