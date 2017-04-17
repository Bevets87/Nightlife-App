import React from 'react'
import { Component } from 'react'

import Navbar from '../statelessComponents/Navbar'

import './Login.scss'

class Login extends Component {
  render () {
    return (
      <div>
        <Navbar />
        <div className='login-container'>
          <form>
            <h1>Login</h1>
            <div className='form-group'>
              <label>Email address:</label>
              <input type='email' className='form-control' id='email' />
            </div>
            <div className='form-group'>
              <label>Password:</label>
              <input type='password' className='form-control' id='pwd' />
            </div>
            <button type='submit' className='btn'>Login</button>
          </form>
        </div>
      </div>
    )
  }
}
export default Login
