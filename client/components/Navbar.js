import React from 'react'
import { Component } from 'react'

import './Navbar.scss'

class Navbar extends Component {
  render () {
    let utilSpace = <div className='nav-util-container'><h1 className='login'>Login</h1><h1 className='register'>Register</h1></div>
    return (
      <nav>
        <h1 className='logo'>What's Good?</h1>
        {utilSpace}
      </nav>
    )
  }
}

export default Navbar
