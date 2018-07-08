import React, { Component } from 'react'
import { connect } from 'react-redux'
import { clearAuthFailure, signoutUser, signinUser, signupUser } from '../actions/auth'


const withAuth = (WrappedComponent) => {
  class AuthContainer extends Component {
    render() {
      return <WrappedComponent {...this.props} />
    }
  }
  const mapStateToProps = (state, ownProps) => ({
    authenticated: state.auth.authenticated,
    user: state.auth.email,
    authError: state.auth.error,
    ...ownProps
  })
  const mapDispatchToProps = (dispatch, ownProps) => ({
    signinUser: (user) => dispatch(signinUser(user)),
    signoutUser: () => dispatch(signoutUser()),
    signupUser: (user) => dispatch(signupUser(user)),
    clearAuthError: () => dispatch(clearAuthFailure()),
    ...ownProps
  })

  return connect(mapStateToProps, mapDispatchToProps)(AuthContainer)
}

export default withAuth