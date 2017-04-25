import React from 'react'
import PropTypes  from 'prop-types'

import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import _ from 'lodash'

import Navbar from '../classComponents/Navbar'

import './Listings.scss'

const Listings = (props) => {
  const { isFetching, listings, listingErrors, bars, user } = props
  if (isFetching) {
    return (
      <div>
        <Navbar />
        <div className='listings-loading-container'>
          <h1>Fetching Data...</h1>
        </div>
      </div>
    )
  } else if (listingErrors) {
    return (
      <div>
        <div className='listings-error-container'>
          <h1>{listingErrors}</h1>
          <Link to='/'><h3>Click to search again.</h3></Link>
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <Navbar />
        <div className='listings-container'>
          <div className='row'>
          {listings.map( listing => {
            const { name, image_url, id } = listing
            let bar = _.find(bars, {bar_id: id})
            let utilSpace
            if (bar) {
              const { attendees } = bar
              const userIsAttendee = _.find(attendees, {name: user})
              if (userIsAttendee) {
                utilSpace = <h3 className='confirmed'>Confirmed!</h3>
              } else if (attendees.length > 0) {
                utilSpace = <h3>{attendees.length} going!</h3>
              } else {
                utilSpace = null
              }
            } else {
              utilSpace = null
            }
            return (
              <div key={id} className='col-md-3 col-sm-6 '>
                <Link to={`details/${id}`}>
                  <div className='col-md-12 col-sm-12  listing-container'>
                    <h1>{name}</h1>
                    {utilSpace}
                    <div className='listing-img-container'>
                      <img src={image_url} />
                    </div>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </div>
    )
  }
}


Listings.propTypes = {
  listings: PropTypes.array,
  isFetching: PropTypes.bool,
  bars: PropTypes.array,
  user: PropTypes.string,
  listingErrors: PropTypes.string
}

const mapStateToProps = (state) => {
  const { listings, isFetching, listingErrors } = state.listingReducer
  const { bars } = state.barReducer
  const { user } = state.userReducer

  return {
    listings,
    isFetching,
    bars,
    user,
    listingErrors
  }
}

export default connect(mapStateToProps)(Listings)
