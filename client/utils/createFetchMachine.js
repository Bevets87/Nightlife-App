import React, { Component } from 'react'
import { func, string } from 'prop-types'

import withMode from '../hocs/withMode'

import FetchMode from '../modes/Fetch'
import FetchingMode from '../modes/Fetching'
import SuccessMode from '../modes/Success'
import FailureMode from '../modes/Failure'

const createFetchMachine = (Components) => {
  class FetchMachine extends Component {
    constructor(props) {
      super(props)
      this.modes = {
        'fetch': new FetchMode(this),
        'fetching': new FetchingMode(this),
        'success': new SuccessMode(this),
        'failure': new FailureMode(this),
      }

      this.state = { mode: this.modes['fetch'] }
      this.enter()
    }
    componentWillUnmount = () => {
      this.props.setMode(this.state.mode.name)
    }

    componentDidMount = () => {
      const { mode } = this.props
      this.setState({ mode: mode ? this.modes[mode] : this.state.mode }, () => { this.enter() })
    }
    enter() {
      if (this.state.mode.enter) this.state.mode.enter()
    }
    exit() {
      if (this.state.mode.exit) this.state.mode.exit()
    }
    onEnter = (fn) => {
      this.state.mode.onEnter(fn)
    }
    onExit = (fn) => {
      this.state.mode.onExit(fn)
    }
    transition(mode) {
      this.exit()
      this.setState({ mode }, () => {
        this.enter()
      })
    }
    renderFetch = (props) => {
      return <Components.Fetch { ...props } />
    }
    renderFetching = (props) => {
      return <Components.Fetching { ...props } />
    }
    renderSuccess = (props) => {
      return <Components.Success { ...props } />
    }
    renderFailure = (props) => {
      return <Components.Failure { ...props } />
    }
    fetch = () => {
      this.state.mode.fetch()
    }
    succeed = () => {
      this.state.mode.succeed()
    }
    fail = () => {
      this.state.mode.fail()
    }
    reset = () => {
      this.state.mode.reset()
    }
    render() {
      return this.state.mode.render({
        onEnter: this.onEnter,
        onExit: this.onExit,
        fetch: this.fetch,
        fail: this.fail,
        succeed: this.succeed,
        reset: this.reset
      }) 
    }
  }

  FetchMachine.propTypes = {
    setMode: func,
    mode: string
  }

  return withMode(FetchMachine)

}

export default createFetchMachine