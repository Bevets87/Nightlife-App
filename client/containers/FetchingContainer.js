import Fetching from '../components/Fetching'
import { connect } from 'react-redux'
import { clearLocation, fetchBars } from '../actions/bar'

export const mapStateToProps = (state) => ({
  searchTerm: state.bars.location
})
  
export const mapDispatchToProps = (dispatch, { fail, succeed, onEnter, onExit }) => ({
  fetchData: (searchTerm) => dispatch(fetchBars({ location: searchTerm })),
  clearSearchTerm: () => dispatch(clearLocation()),
  fail, succeed, onEnter, onExit 
})
  


export default connect(mapStateToProps, mapDispatchToProps)(Fetching)