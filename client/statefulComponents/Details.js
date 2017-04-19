import React from 'react'
import { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { createAttendee } from '../actions/attendeeActions'

import _ from 'lodash'

import Navbar from '../statelessComponents/Navbar'

import './Details.scss'

class Details extends Component {
  constructor (props) {
    super(props)
    this.state = {
      attendee: null,
      bar_id: null,
      date: null
    }
    this.handleAttendees = this.handleAttendees.bind(this)
    this.handleGoing = this.handleGoing.bind(this)
  }
  handleAttendees (event) {
    event.preventDefault()
    console.log(event.target)
  }
  handleGoing (event) {
    event.preventDefault()
    const { id } = this.props.listings
    this.setState({
      bar_id: id
    })
    createAttendee(this.state)
  }
  render () {
    const { name, image_url, location, rating, display_phone } = this.props.listings
    const { address1, city, state, } = location
    return (
      <div>
        <Navbar details  />
        <div className='modal-listing-container'>
          <h1>{name}</h1>
          <img className='img-responsive' src={image_url} />
          <div className='row'>
            <div className='col-xs-4'><h3 className='attendees' onClick={this.handleAttendees}>Click to see who is going!</h3></div>
            <div className='col-xs-4'>
              <div className='location-container'>
                <h3>{`${address1}`}</h3>
                <h3>{`${city}, ${state}`}</h3>
                <h3>{display_phone}</h3>
                <h3>Rating: {rating}</h3>
              </div>
            </div>
            <div className='col-xs-4'><h3 className='going' onClick={this.handleGoing}>Click to Go!</h3></div>
          </div>
        </div>
      </div>
    )
  }
}

Details.propTypes = {
  listings: PropTypes.object,
  dispatch: PropTypes.func
}

const mapStateToProps = (state, ownProps) => {
  const { listings } = state.listingReducer
  const listing = _.find(listings, {id: ownProps.id})
  return {
    listings: listing
  }
}

export default connect(mapStateToProps)(Details)
