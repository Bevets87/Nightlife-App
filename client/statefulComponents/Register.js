import React from 'react'
import { Component } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { userRegistrationRequest, setErrors } from '../actions/userActions'

import validateRegistrationInput from '../../server/shared/validations/register'

import Navbar from '../statelessComponents/Navbar'

import './Register.scss'

class Register extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      passwordConfirmation: '',
      clientErrors: {}
    }
    this.handleRegister = this.handleRegister.bind(this)
    this.handleOnChange = this.handleOnChange.bind(this)
  }
  componentDidMount () {
    this.props.dispatch(setErrors({}))
  }
  isValid () {
    const { errors, isValid } = validateRegistrationInput (this.state)

    if (!isValid) {
      this.setState({
        clientErrors: errors
      })
    }

    return isValid
  }
  handleRegister (event) {
    event.preventDefault()
    this.setState({
      clientErrors: {}
    })
    if (this.isValid()) {
      this.props.dispatch(userRegistrationRequest(this.state))
    }
  }
  handleOnChange (event) {
    switch (event.target.id) {
    case 'email':
      this.setState({
        email: event.target.value
      })
      break
    case 'pwd':
      this.setState({
        password: event.target.value
      })
      break
    case 'pwd-confirmation':
      this.setState({
        passwordConfirmation: event.target.value
      })
      break
    }
  }
  render () {
    const { clientErrors } = this.state
    const { serverErrors } = this.props
    return (
      <div>
        <Navbar />
        <div className='register-container'>
          <form>
            <h1>Register</h1>
            <div className='form-group'>
              <label>Email address:</label>
              {clientErrors.email && <span className='error'>{clientErrors.email}</span>}
              <input type='email' className='form-control' id='email' onChange={this.handleOnChange} />
            </div>
            <div className='form-group'>
              <label>Password:</label>
              {clientErrors.password && <span className='error'>{clientErrors.password}</span>}
              <input type='password' className='form-control' id='pwd' onChange={this.handleOnChange} />
            </div>
            <div className='form-group'>
              <label>Password confirmation:</label>
              {clientErrors.passwordConfirmation && <span className='error'>{clientErrors.passwordConfirmation}</span>}
              <input type='password' className='form-control' id='pwd-confirmation' onChange={this.handleOnChange} />
            </div>
            <button type='submit' className='btn' onClick={this.handleRegister}>Register</button>
          </form>
        </div>
        {serverErrors.registrationForm && <div className='error-container'><span className='error'>{serverErrors.registrationForm}</span></div>}
      </div>
    )
  }
}

Register.propTypes = {
  dispatch: PropTypes.func,
  serverErrors: PropTypes.object
}

const mapStateToProps = (state) => {
  const { serverErrors } = state.userReducer

  return {
    serverErrors
  }
}
export default connect(mapStateToProps)(Register)
