import React, { Component } from 'react'
import { string, number, func, object } from 'prop-types'

import '../styles/components/Bar.scss'

class Bar extends Component {
  state = { showPatrons: false }
  
  showPatrons = () => {
    if (this.props.going > 0) {
      this.setState({ showPatrons: true })
    }
  }
  hidePatrons = () => {
    this.setState({ showPatrons: false })
  }
  handleRemovePatron = (e) => {
    e.preventDefault()
    this.props.removePatron(this.props.id)
  }
  handleAddPatron = (e) => {
    e.preventDefault()
    this.props.addPatron(this.props.id)
  }
  render() {
    const {
      id, 
      name, 
      image_url, 
      going, 
      rating, 
      patrons, 
      removePatron, 
      addPatron, 
      requireAuth,
      isGoing,
      render,
 
    } = this.props
  
    return(
      <div className="bar">
        <img className="bar__image" src={image_url} data-testid="bar-image"/>
        <span className="bar__name" data-testid="bar-name">{name}</span>
        <span className="bar__rating" data-testid="bar-rating">Rating {rating}</span>
        <button 
          onClick={requireAuth(this.showPatrons)} 
          className={`bar__${going > 0 ? 'going' : 'none'}`}
        >
          Going <span data-testid="bar-going">{going}</span>
        </button>
        { isGoing(patrons) ? 
          <button onClick={requireAuth(this.handleRemovePatron)} className="bar__remove">Leave</button> :
          <button onClick={requireAuth(this.handleAddPatron) } className="bar__add">Go</button>
        }
        { this.state.showPatrons ? render({ bar: name, patrons, hide: requireAuth(this.hidePatrons)}) : null }
      </div>
    )
  }
}

Bar.propTypes = {
  id: string,
  name: string,
  going: number,
  rating: number,
  image_url: string,
  addPatron: func,
  removePatron: func,
  patrons: object,
  requireAuth: func,
  render: func,
  isGoing: func
 
}



export default Bar  