import React, { Component } from 'react'
import { object, func, string } from 'prop-types'

import faWindowClose from '@fortawesome/fontawesome-free-solid/faWindowClose'
import IconButton from './IconButton'


import '../styles/components/Patrons.scss'

class Patrons extends Component {
  
  render() {
    const { bar, patrons, hide } = this.props
    return(
      <div className="patrons">
        <div className="patrons__header">
          <h1 data-testid="patron-bar">{bar}</h1>
        </div>
        <div className="patrons__box" data-testid="patrons">
          {Object.keys(patrons).map((email, index) => 
            <div key={index} className="patron">
              <span className="email" data-testid={`patron-email-${index}`}>{email}</span> will be attending!
            </div>
          )}
        </div>
        <div className="patrons__footer"> 
          <IconButton className="exit-icon" icon={faWindowClose} onClick={hide} text={'exit'} />
        </div>
      </div>
    )
  }
}

Patrons.propTypes = {
  patrons: object,
  hide: func,
  bar: string
}

export default Patrons


