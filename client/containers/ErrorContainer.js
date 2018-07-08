import Error from '../components/Error'
import { connect } from 'react-redux'
import { clearFetchBarsFailure } from '../actions/bar'

export const mapStateToProps = (state) => ({
  error: state.bars.error.fetch
})

export const mapDispatchToProps = (dispatch, { reset }) => ({
  clear: () => {
    reset()
    return dispatch(clearFetchBarsFailure())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Error)