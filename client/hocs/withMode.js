import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setMode } from '../actions/mode'

const withMode = (WrappedComponent) => {
  class ModeContainer extends Component {
    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  const mapStateToProps = (state, ownProps) => ({
    mode: state.mode,
    ...ownProps 
  })

  const mapDispatchToProps = (dispatch, ownProps) => ({
    setMode: (mode) => dispatch(setMode(mode)),
    ...ownProps
  })

  return connect(mapStateToProps, mapDispatchToProps)(ModeContainer)
}

export default withMode 


