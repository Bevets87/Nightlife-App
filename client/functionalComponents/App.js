import React from 'react'
import PropTypes from 'prop-types'

import { BrowserRouter as Router, Route } from 'react-router-dom'

import { connect } from 'react-redux'

import Home from '../classComponents/Home'
import Login from '../classComponents/Login'
import Register from '../classComponents/Register'
import Listings from './Listings'
import Details from '../classComponents/Details'
import VideoBackground from './VideoBackground'

const App = (props) => {
  const { listings } = props
  return (
    <Router>
      <div>
        <VideoBackground />
        <Route exact path='/' component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route path='/listings' component={Listings} />
        <Route path='/details/:id' component={(props) => {
          const listing = listings.filter(listing => props.match.params.id == listing.id)
          return <Details id={listing[0].id} key={props.location.key} {...props} />
        }}/>
      </div>
    </Router>
  )
}

App.propTypes = {
  listings: PropTypes.array,
  match: PropTypes.object,
  location: PropTypes.object
}

const mapStateToProps = (state) => {
  const { listings } = state.listingReducer

  return {
    listings
  }
}


export default connect(mapStateToProps)(App)
