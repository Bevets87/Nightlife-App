import React from 'react'
import { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { createBar, getBars } from '../actions/barActions'

import _ from 'lodash'

import Navbar from './Navbar'
import AttendeesModal from '../functionalComponents/AttendeesModal'

import './Details.scss'

class Details extends Component {
  constructor (props) {
    super(props)
    this.state = {
      attendee: null,
      bar_id: null,
      attendeesModal: false
    }
    this.handleAttendeesModal = this.handleAttendeesModal.bind(this)
    this.handleGoing = this.handleGoing.bind(this)
  }
  componentDidMount () {
    this.setState({
      attendeesModal: false
    })
  }
  handleAttendeesModal (event) {
    event.preventDefault()
    const { isAuthenticated } = this.props
    if (isAuthenticated) {
      let modalBool = this.state.attendeesModal ? false : true
      this.setState({
        attendeesModal: modalBool
      })
    }
  }
  handleGoing (event) {
    event.preventDefault()
    const { isAuthenticated, user } = this.props
    const { id } = this.props.listings
    if (isAuthenticated) {
      this.props.dispatch(createBar({attendee: user, bar_id: id})
        .then(
          () => {
            this.props.dispatch(getBars())
            this.setState({
              attendee: user,
              bar_id: id
            })
          })
        .catch(
          error => {
            alert(error.response.data)
          })
        )
    }
  }
  render () {
    const { bars, user, listings } = this.props
    const { name, image_url, location, rating, display_phone } = listings
    const { address1, city, state, } = location

    let isGoingUtilSpace

    if (bars) {
      const { attendees } = bars
      let barWithUser = _.find(attendees, {name: user})
      if (barWithUser) {
        isGoingUtilSpace = <h3 className='confirmed' onClick={this.handleGoing}>Confirmed!</h3>
      } else {
        isGoingUtilSpace = <h3 className='going' onClick={this.handleGoing}>Click to Go!</h3>
      }
    } else {
      isGoingUtilSpace = <h3 className='going' onClick={this.handleGoing}>Click to Go!</h3>
    }
    return (
      <div>
        <Navbar details  />
        <div className='modal-listing-container'>
          <h1>{name}</h1>
          <img className='img-responsive' src={image_url} />
          <div className='row'>
            <div className='col-xs-4'><h3 className='attendees' onClick={this.handleAttendeesModal}>Click to see who is going!</h3></div>
            <div className='col-xs-4'>
              <div className='location-container'>
                <h3>{`${address1}`}</h3>
                <h3>{`${city}, ${state}`}</h3>
                <h3>{display_phone}</h3>
                <h3>Rating: {rating}</h3>
              </div>
            </div>
            <div className='col-xs-4'>
              {isGoingUtilSpace}
            </div>
          </div>
        </div>
        {this.state.attendeesModal && bars && bars.attendees.length > 0 && <AttendeesModal handleAttendeesModal={this.handleAttendeesModal} bars={bars} />}
      </div>
    )
  }
}

Details.propTypes = {
  dispatch: PropTypes.func,
  user: PropTypes.string,
  isAuthenticated: PropTypes.bool,
  listings: PropTypes.object,
  bars: PropTypes.object
}

const mapStateToProps = (state, ownProps) => {
  const { listings } = state.listingReducer
  const { user, isAuthenticated } = state.userReducer
  const { bars } = state.barReducer
  const listing = _.find(listings, {id: ownProps.id})
  const bar = _.find(bars, {bar_id: ownProps.id})

  return {
    listings: listing,
    user,
    isAuthenticated,
    bars: bar

  }
}

export default connect(mapStateToProps)(Details)
