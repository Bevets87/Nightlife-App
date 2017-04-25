import React from 'react'
import { Component } from 'react'
import PropTypes from 'prop-types'

import { Link, withRouter } from 'react-router-dom'

import { connect } from 'react-redux'
import { setUser } from '../actions/userActions'

import './Navbar.scss'

class Navbar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      toggledDropDown: false
    }
    this.profileLogout = this.profileLogout.bind(this)
    this.handleDropDown = this.handleDropDown.bind(this)
  }
  profileLogout (event) {
    event.preventDefault()
    localStorage.removeItem('token')
    this.props.dispatch(setUser(null, false))
    this.props.history.push('/')
    this.setState({
      toggledDropDown: false
    })
  }
  handleDropDown (event) {
    event.preventDefault()
    this.setState({
      toggledDropDown: this.state.toggledDropDown ? false : true
    })
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
    let loginMobilUtilSpace = <div className='nav-util-container'><span onClick={this.handleDropDown} className='glyphicon glyphicon-log-in' aria-hidden='true'></span></div>
    let logoutMobilUtilSpace = <div className='nav-util-container'><span onClick={this.handleDropDown} className='glyphicon glyphicon-log-out' aria-hidden='true'></span></div>
    let dropDownMenu
    if (isAuthenticated) {
      dropDownMenu = <ul className='drop-down-menu'><li onClick={this.profileLogout}>Logout</li></ul>
    } else {
      dropDownMenu = <ul className='drop-down-menu'><Link to='/login'><li>Login</li></Link><Link to ='/register'><li>Register</li></Link></ul>
    }
    return (
      <nav>
        <Link to='/'><h1 className='logo'>What's Good?</h1></Link>
        {utilSpace}
        {!details && !isAuthenticated && loginMobilUtilSpace}
        {!details && isAuthenticated && logoutMobilUtilSpace}
        {this.state.toggledDropDown && dropDownMenu}
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
