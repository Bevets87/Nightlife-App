import React from 'react'
import { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { getYelpListings } from '../actions/yelpApiActions'

import './Home.scss'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchTerm: ''
    }
    this.handleInput = this.handleInput.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }
  handleInput (event) {
    this.setState({
      searchTerm: event.target.value
    })
  }
  handleClick (event) {
    event.preventDefault()
    this.props.dispatch(getYelpListings(this.state))
  }
  render () {
    const { listings } = this.props
    return (
      <div>
        <div className='home-title-container'>
          <h1>Make something happen tonight!</h1>
          <div className='input-group'>
            <input type='text' className='form-control' placeholder='Search by location...' onChange={this.handleInput} />
            <span className='input-group-btn'>
              <button className='btn btn-default' type='button' onClick={this.handleClick}>Go!</button>
            </span>
          </div>
        </div>
      </div>
    )
  }
}

Home.propTypes = {
  listings: PropTypes.array,
  dispatch: PropTypes.func
}

const mapStateToProps = (state) => {
  const { listings } = state
  return {
    listings
  }
}

export default connect(mapStateToProps)(Home)
