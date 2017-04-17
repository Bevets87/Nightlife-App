import React from 'react'
import PropTypes  from 'prop-types'

import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import Navbar from '../statelessComponents/Navbar'

import './Listings.scss'

const Listings = (props) => {
  const { isFetching, listings, errors} = props
  if (isFetching) {
    return (
      <div>
        <Navbar />
        <div className='loading-container'>
          <h1>Fetching Data...</h1>
        </div>
      </div>
    )
  } else if (errors) {
    return (
      <div>
        <Navbar />
        <div className='error-container'>
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
            return (
              <div key={id} className='col-md-3'>
                <Link to={`details/${id}`}>
                  <div className='col-md-12 listing-container'>
                    <h1>{name}</h1>
                    <div className='listing-img-container'>
                      <h3>2 going!</h3>
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
}

const mapStateToProps = (state) => {
  const { listings, isFetching, errors } = state
  return {
    listings,
    isFetching,
    errors
  }
}

export default connect(mapStateToProps)(Listings)
