import Bars from '../components/Bars'
import withAuthRouter from '../hocs/withAuthRouter'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { clearFetchBarsSuccess, addPatron, removePatron } from '../actions/bar'

export const mapStateToProps = (state) => ({
  bars: state.bars.ids.map(id => state.bars.listings[id] )
})

export const mapDispatchToProps = (dispatch, { reset, requireAuth, user }) => ({
  reset: () => { reset(); return dispatch(clearFetchBarsSuccess()) },
  addPatron: (yelp_id) => dispatch(addPatron({ yelp_id, email: user })),
  removePatron: (yelp_id) => dispatch(removePatron({ yelp_id, email: user })),
  isGoing: (patrons) => patrons[user],
  requireAuth
})

export default compose(withAuthRouter, connect(mapStateToProps, mapDispatchToProps))(Bars)


