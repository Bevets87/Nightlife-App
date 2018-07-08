import React, { Component } from 'react'

import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faSpinner from '@fortawesome/fontawesome-free-solid/faSpinner'

import '../styles/components/Spinner.scss'

class Spinner extends Component {
  render() {
    
    return(
      <div className="spinner" data-testid="spinner">
        <FontAwesomeIcon 
          icon={faSpinner} 
          spin 
        
        />
      </div>
    )
  }
}


export default Spinner 