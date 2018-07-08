import React, { Component } from 'react'
import { array, func } from 'prop-types'

import IconButton from './IconButton'
import faSearch from '@fortawesome/fontawesome-free-solid/faSearch'

import '../styles/components/Bars.scss'

class Bars extends Component {
  render() {
    const { bars, reset } = this.props
   
    return(
      <div className="bars">
      
        <div className="bars__search-box">
          <IconButton 
            onClick={reset} 
            text={'new search'}
            icon={faSearch}
            className="search-anchor"  
          />
        </div>
        <div className="bars__box" data-testid="bars">
          
          {bars.map((bar) => 
            <div key={bar.id}> 
              {this.props.render({
                ...bar,
                ...this.props
              })}
            </div>
          ) }
       
        </div>
      </div>
    )
  }
}

Bars.propTypes = {
  bars: array,
  reset: func,
  render: func,
}

export default Bars 