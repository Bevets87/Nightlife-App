import React from 'react'
import PropTypes from 'prop-types'

import { BrowserRouter as Router, Route } from 'react-router-dom'

import { connect } from 'react-redux'

import Navbar from '../statelessComponents/Navbar'
import VideoBackground from '../statelessComponents/VideoBackground'
import Home from './Home'
import Login from './Login'
import Register from './Register'
import Listings from '../statelessComponents/Listings'
import Listing from './Listing'

const App = (props) => {
  const { listings } = props
  return (
    <Router>
      <div>
        <Navbar />
        <VideoBackground />
        <Route exact path='/' component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/listings' component={Listings} />
        <Route path='/:id' render={(props) => {
          const listing = listings.filter(listing => props.match.params.id == listing.id)

          return (
            <div>
              <Navbar listingModal />
              <Listing key={listing[0].id} listing={listing[0]} {...props} />
            </div>
          )
        }}/>
      </div>
    </Router>
  )
}

App.propTypes = {
  listings: PropTypes.array,
  match: PropTypes.object
}

const mapStateToProps = (state) => {
  const { listings } = state

  return {
    listings
  }
}


export default connect(mapStateToProps)(App)
