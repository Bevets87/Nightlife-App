import React, { Component } from 'react'
import { string, func } from 'prop-types'

import faSearch from '@fortawesome/fontawesome-free-solid/faSearch'
import IconButton from './IconButton'

import '../styles/components/SearchBar.scss'

class SearchBar extends Component {
  render() {
    const { search, searchTerm, setSearchTerm } = this.props

    return(
      <div className="search-bar">
        <div className="search-bar__title">
          <h1 data-testid="search-bar-title">Have Some Fun Tonight!</h1>
        </div>
        <div className="search-bar__box">
          <input 
            data-testid="search-bar-input"
            type="text"
            placeholder="search by location"
            onChange={(e) => { setSearchTerm(e.target.value) }}
            value={searchTerm}
          />
          <IconButton
            
            onClick={search}
            icon={faSearch}
            className="search-icon"
          />
        </div>
        
      </div>
      
    )
  }
}

SearchBar.propTypes = {
  searchTerm: string,
  setSearchTerm: func,
  search: func
}

export default SearchBar
