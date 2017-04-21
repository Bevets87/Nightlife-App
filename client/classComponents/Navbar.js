import React from 'react'
import { Component } from 'react'
import PropTypes from 'prop-types'

import { Link, withRouter } from 'react-router-dom'

import { connect } from 'react-redux'
import { setUserAuth, setUser } from '../actions/userActions'

import './Navbar.scss'

class Navbar extends Component {
  constructor (props) {
    super(props)
    this.profileLogout = this.profileLogout.bind(this)
  }
  componentWillUnmount () {
    localStorage.removeItem('token')
  }
  profileLogout (event) {
    event.preventDefault()
    localStorage.removeItem('token')
    this.props.dispatch(setUserAuth())
    this.props.dispatch(setUser(null))
    this.props.history.push('/')
  }
  render () {
    const { details, isAuthenticated, user } = this.props
    let utilSpace
    if (details) {
      utilSpace = <div className='nav-util-container'><Link to='/listings'><h1 className='back'>Back</h1></Link></div>
    } else if (isAuthenticated) {
      utilSpace = <div className='nav-util-container'><h1 onClick={this.profileLogout} className='logout'>Logout</h1><h1 className='user'>Welcome {user}!</h1></div>
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
}

Navbar.propTypes = {
  details: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  user: PropTypes.string,
  dispatch: PropTypes.func,
  history: PropTypes.object
}

const mapStateToProps = (state) => {
  const { isAuthenticated, user } = state.userReducer

  return {
    isAuthenticated,
    user
  }
}

export default connect(mapStateToProps)(withRouter(Navbar))
