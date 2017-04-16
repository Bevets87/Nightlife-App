import React from 'react'
import { Link } from 'react-router-dom'

import './Navbar.scss'

const Navbar = () => {
  let utilSpace = <div className='nav-util-container'><Link to='/login'><h1 className='login'>Login</h1></Link><Link to='/register'><h1 className='register'>Register</h1></Link></div>
  return (
    <nav>
      <Link to='/'><h1 className='logo'>What's Good?</h1></Link>
      {utilSpace}
    </nav>
  )
}

export default Navbar
