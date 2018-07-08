import React, { Component } from 'react'
import { func, object, bool } from 'prop-types'

import '../styles/components/Auth.scss'

class Signin extends Component {
  state = { email: '', password: '' }
  componentWillUnmount() {
    this.props.clearAuthError()
  }
  handleOnEmailChange = (e) => {
    this.setState({ email: e.target.value })
  }
  handleOnPasswordChange = (e) => {
    this.setState({ password: e.target.value })
  }
  renderSignin() {
    const { redirect, clearAuthError, signinUser, authError } = this.props
    return(
      <div className="auth">
     
        <form className="form">
          <h1 data-testid="signin-title">Sign In</h1>
          
          <input
        
            type="email" 
            placeholder="email" 
            value={this.state.email}
            onChange={this.handleOnEmailChange} 
          />
          <input
            
            type="password" 
            placeholder="password" 
            value={this.state.password}
            onChange={this.handleOnPasswordChange}
          />
          
          <div className="form__button-box">
            <button onClick={() => { redirect('/signup') }}>Sign Up</button>
            <button onClick={(e) => { e.preventDefault(); clearAuthError(); signinUser(this.state)} }>Submit</button>
          </div>
          
          <div className="form__error-box">
            <span data-testid="signin-error">{ authError ? authError.message : null }</span>
          </div> 
          
        </form>
      </div>
              
    )
  }
  render() {
    return this.props.authenticated ? this.props.renderRedirect('/') : this.renderSignin()
  }
}

Signin.propTypes = {
  signinUser: func,
  authError: object,
  authenticated: bool,
  renderRedirect: func,
  redirect: func,
  clearAuthError: func
}

export default Signin 