import React from 'react'
import PropTypes  from 'prop-types'

import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import _ from 'lodash'

import Navbar from '../classComponents/Navbar'

import './Listings.scss'

const Listings = (props) => {
  const { isFetching, listings, errors} = props
  if (isFetching) {
    return (
      <div>
        <Navbar />
        <div className='listings-loading-container'>
          <h1>Fetching Data...</h1>
        </div>
      </div>
    )
  } else if (errors) {
    return (
      <div>
        <Navbar />
        <div className='listings-error-container'>
          <h1>{errors}</h1>
        </div>
      </div>
    )
  }{
    return (
      <div>
        <Navbar />
        <div className='listings-container'>
          <div className='row'>
          {listings.map( listing => {
            const { name, image_url, id } = listing
            const { bars, user } = props
            let bar = _.find(bars, {bar_id: id})
            let utilSpace
            if (bar) {
              const { attendees } = bar
              let barWithUser = _.find(attendees, {name: user})
              if (barWithUser) {
                utilSpace = <h3 className='confirmed'>Confirmed!</h3>
              } else if (bar.attendees.length > 0) {
                utilSpace = <h3>{bar.attendees.length} going!</h3>
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
  errors: PropTypes.object,
  bars: PropTypes.array,
  user: PropTypes.string
}

const mapStateToProps = (state) => {
  const { listings, isFetching, errors } = state.listingReducer
  const { bars } = state.barReducer
  const { user } = state.userReducer

  return {
    listings,
    isFetching,
    errors,
    bars,
    user
  }
}

export default connect(mapStateToProps)(Listings)
