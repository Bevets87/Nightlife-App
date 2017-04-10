import React from 'react'
import { Component } from 'react'

import Navbar from './Navbar'

import './Home.scss'

class Home extends Component {
  constructor (props) {
    super(props)
    return {
      
    }
  }
  render () {
    return (
      <div>
        <Navbar />
        <div className='about-container'></div>
        <div className='about-title-container'>
          <h1>Make something happen tonight!</h1>
          <div className='input-group'>
            <input type='text' className='form-control' placeholder='Search by location...' />
            <span className='input-group-btn'>
              <button className='btn btn-default' type='button'>Go!</button>
            </span>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
