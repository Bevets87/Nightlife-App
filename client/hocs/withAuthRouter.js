import React, { Component } from 'react'
import { bool, object } from 'prop-types'
import { Redirect, withRouter } from 'react-router-dom'
import { compose } from 'redux'
import withAuth from './withAuth'

const withAuthRouter = (WrappedComponent) => {
  class AuthRouterContainer extends Component {
    requireAuth = (handler) => {
      const { authenticated, history } = this.props
      return (...args) => {
        if (authenticated) {
          handler.apply(null, args)
        } else {
          history.push('/signin')
        }
      }
    }
    renderRedirect = (path) => {
      return <Redirect to={path} />
    }
    redirect = (path) => {
      const { history } = this.props
      history.push(path)
    }
    render() {
      return <WrappedComponent

        requireAuth={this.requireAuth}
        renderRedirect={this.renderRedirect}
        redirect={this.redirect}
        {...this.props}

      />
    }

  }
  AuthRouterContainer.propTypes = {
    history: object,
    authenticated: bool
  }
  return compose(withAuth, withRouter)(AuthRouterContainer)
}

export default withAuthRouter