import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import './Navbar.scss'

const Navbar = (props) => {
  const { details } = props
  let utilSpace
  if (details) {
    utilSpace = <div className='nav-util-container'><Link to='/listings'><h1 className='back'>Back</h1></Link></div>
  } else {
    utilSpace = <div className='nav-util-container'><Link to='/login'><h1 className='login'>Login</h1></Link><Link to='/register'><h1 className='register'>Register</h1></Link></div>
  }
  return (
    <nav>
      <Link to='/'><h1 className='logo'>What's Good?</h1></Link>
      {utilSpace}
    </nav>
  )
}


Navbar.propTypes = {
  details: PropTypes.bool
}

export default Navbar
