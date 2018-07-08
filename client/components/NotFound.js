import React, { Component } from 'react'

import '../styles/components/NotFound.scss'

class NotFound extends Component {
  render() {
    return(
      <div className="not-found">
        <div className="not-found__box">      
          <h1 data-testid="not-found-text">Page Not Found</h1>
        </div>
      </div>
            
      
    )
  }
}

export default NotFound