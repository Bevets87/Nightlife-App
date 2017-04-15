import React from 'react'
import { Component } from 'react'

import axios from 'axios'

import './Home.scss'

class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchTerm: '',
      bars: []
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

    axios.post('/api', this.state)
      .then(
        response => {
          this.setState({
            bars: response.data.bars
          })
          console.log(this.state.bars)
        },
        error => {
          console.log(error)
        }
      )
  }
  render () {
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
        {this.state.bars.map(bar => {
          const { name, rating } = bar
          return (
            <div className='home-bars-container'>
              <h1>{name}</h1>
              <h1>{rating}</h1>
            </div>
          )
        })}
      </div>
    )
  }
}

export default Home
