import SearchBar from '../components/SearchBar'
import { connect } from 'react-redux'
import { setLocation } from '../actions/bar'

export const mapStateToProps = (state) => ({
  searchTerm: state.bars.location
})

export const mapDispatchToProps = (dispatch, { fetch }) => {
  return {
    setSearchTerm: (term) => dispatch(setLocation(term)),
    search: fetch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar) 