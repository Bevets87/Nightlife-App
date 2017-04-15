import React from 'react'
import { Component } from 'react'

import './Register.scss'

class Register extends Component {
  render () {
    return (
      <div className='register-container'>
        <form>
          <h1>Register</h1>
          <div className='form-group'>
            <label>Email address:</label>
            <input type='email' className='form-control' id='email' />
          </div>
          <div className='form-group'>
            <label>Password:</label>
            <input type='password' className='form-control' id='pwd' />
          </div>
          <div className='form-group'>
            <label>Password confirmation:</label>
            <input type='password' className='form-control' id='pwd-confirmation' />
          </div>
          <button type='submit' className='btn'>Register</button>
        </form>
      </div>
    )
  }
}
export default Register
