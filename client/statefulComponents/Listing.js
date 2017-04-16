import React from 'react'
import { Component } from 'react'
import PropTypes from 'prop-types'

import './Listing.scss'

class Listing extends Component {
  constructor (props) {
    super(props)
    this.state = {
      attending: false
    }
  }
  render () {
    const { name, image_url, location } = this.props.listing
    const { address1, city, state, } = location
    return (
      <div>
        <div className='modal-listing-container'>
          <h1>{name}</h1>
          <img className='img-responsive' src={image_url} />
          <h3>{`${address1}`}</h3>
          <h3>{`${city}, ${state}`}</h3>
        </div>
      </div>
    )
  }
}

Listing.propTypes = {
  listing: PropTypes.object
}

export default Listing
