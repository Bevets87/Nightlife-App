import React, { Component } from 'react'
import { func, object, bool } from 'prop-types'

import '../styles/components/Auth.scss'

class Signup extends Component {
  state = { email: '', password: '', passwordConfirmation: '' }
  componentWillUnmount() {
    this.props.clearAuthError()
  }
  handleOnEmailChange = (e) => {
    this.setState({ email: e.target.value })
  }
  handleOnPasswordChange = (e) => {
    this.setState({ password: e.target.value })
  }
  handleOnPasswordConfirmationChange = (e) => {
    this.setState({ passwordConfirmation: e.target.value })
  } 
  renderSignup() {
    const { clearAuthError, signupUser, authError } = this.props
    return (
      <div className="auth">
        <form className="form">
          <h1 data-testid="signup-title">Sign Up</h1>
          
          <input 
            type="email"
            placeholder="email"
            onChange={this.handleOnEmailChange}
            value={this.state.email} 
          />
          <input
            type="password"
            placeholder="password"
            onChange={this.handleOnPasswordChange}
            value={this.state.password}
          />
          <input
            type="password"
            placeholder="password confirmation"
            onChange={this.handleOnPasswordConfirmationChange}
            value={this.state.passwordConfirmation}
          />
      
          <div className="form__button-box">
            <button onClick={(e) => {e.preventDefault(); clearAuthError(); signupUser(this.state) }}>Submit</button>
          </div>

          <div className="form__error-box">
            <span data-testid="signup-error">{ authError ? authError.message : null }</span>
          </div> 
        
        </form>
      </div>

    )
  }
  render() {
    return this.props.authenticated ? this.props.renderRedirect('/') : this.renderSignup()
  }
}

Signup.propTypes = {
  signupUser: func,
  clearAuthError: func,
  authError: object,
  authenticated: bool,
  renderRedirect: func
}

export default Signup