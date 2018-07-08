import React, { Component } from 'react'
import { func, string, object } from 'prop-types'

import FontAwesomeIcon from '@fortawesome/react-fontawesome'

class IconButton extends Component {
  render() {
    const { text, onClick, icon, className } = this.props
    return (
      
      <button
        className={className ? className : null} 
        onClick={onClick}>
        <FontAwesomeIcon 
          icon={icon} 
        />
        {text ? text : null}
      </button>
    
    )
    
  }
}

IconButton.propTypes = {
  onClick: func,
  text: string,
  icon: object,
  className: string
}
 
export default IconButton