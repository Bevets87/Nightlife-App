import React from 'react'
import PropTypes  from 'prop-types'

import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import './Listings.scss'

const Listings = (props) => {
  const { listings, isFetching, errors } = props
  if (isFetching) {
    return (
      <div>
        <div className='loading-container'>
          <h1>Fetching Data...</h1>
        </div>
      </div>
    )
  } else if (errors.error) {
    return (
      <div>
        <div className='error-container'>
          <h1>{errors.error.description}</h1>
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <div className='listings-container'>
          <div className='row'>
            {listings.map( listing => {
              const { name, image_url, id } = listing
              return (
                <Link to={`/${id}`}>
                  <div className='col-md-3'>
                    <div className='col-md-12 listing-container'>
                      <h1>{name}</h1>
                      <img src={image_url} />
                    </div>
                  </div>
                </Link>
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
  errors: PropTypes.object
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
