import React, { Component } from 'react'
import { object } from 'prop-types'

const withDynamicImport = (LoadingComponent) => {
  class DynamicImportContainer extends Component {
    ImportedComponent = null
    constructor(props) {
      super(props)
      this.state = {
        loaded: false
      }
    }
    componentDidMount() {
      this.props.import.then(module => {
        this.ImportedComponent = module.default
        this.setState({ loaded: true })
      })
    }
    render() {
      return this.state.loaded ? <this.ImportedComponent {...this.props} /> :<LoadingComponent />
    }
  }

  DynamicImportContainer.propTypes = {
    import: object,
  }

  return DynamicImportContainer
}

export default withDynamicImport

