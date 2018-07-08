import React, { Component } from 'react'
import { func, string } from 'prop-types'

import Spinner from './Spinner'

class Fetching extends Component {
  handleFetch = () => {
    const { searchTerm, succeed, fail } = this.props
 
    this.props.fetchData(searchTerm)
      .then(succeed)
      .catch(fail)
  }
  componentDidMount() {
    this.props.onEnter(this.handleFetch)
    this.props.onExit(this.props.clearSearchTerm)
  }
  render() {
    return <Spinner />
  }
}

Fetching.propTypes = {
  fetchData: func,
  searchTerm: string,
  fail: func,
  onEnter: func,
  onExit: func,
  clearSearchTerm: func,
  succeed: func
}

export default Fetching