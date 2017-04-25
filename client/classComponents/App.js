import React from 'react'
import { Component } from 'react'
import PropTypes from 'prop-types'

import { BrowserRouter as Router, Route } from 'react-router-dom'

import { connect } from 'react-redux'
import { setUser } from '../actions/userActions'

import Home from './Home'
import Login from './Login'
import Register from './Register'
import Listings from '../functionalComponents/Listings'
import Details from './Details'
import VideoBackground from '../functionalComponents/VideoBackground'

class App extends Component {
  constructor (props) {
    super(props)
  }
  componentDidMount () {
    localStorage.removeItem('token')
    this.props.dispatch(setUser(null, false))
  }
  render () {
    const { listings } = this.props
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
}

App.propTypes = {
  listings: PropTypes.array,
  match: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func
}

const mapStateToProps = (state) => {
  const { listings } = state.listingReducer

  return {
    listings
  }
}


export default connect(mapStateToProps)(App)
