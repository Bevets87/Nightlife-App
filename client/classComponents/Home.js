import React from 'react'
import { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { requestListings, setListingErrors  } from '../actions/listingActions'

import Navbar from './Navbar'

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
  componentDidMount () {
    this.props.dispatch(setListingErrors(null))
  }
  handleInput (event) {
    this.setState({
      searchTerm: event.target.value
    })
  }
  handleClick (event) {
    event.preventDefault()
    if(this.state.searchTerm.length > 0) {
      this.props.dispatch(requestListings(this.state))
      this.props.history.push('/listings')
    }
  }
  render () {
    return (
      <div>
        <Navbar/>
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
  dispatch: PropTypes.func,
  history: PropTypes.object
}

export default connect()(Home)
