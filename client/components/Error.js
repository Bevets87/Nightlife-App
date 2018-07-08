import React, { Component } from 'react'
import { func, object } from 'prop-types'

import '../styles/components/Error.scss'

class Error extends Component {
  render() {
    const { error, clear } = this.props

    return (
      <div className="error">
        <div className="error__box">
          <h1 data-testid="error-message">{error ? error.message : null}</h1>
          <button onClick={clear}>Ok</button>
        </div>
      </div> 
      
    )
  }
}

Error.propTypes = {
  clear: func,
  error: object
}

export default Error 