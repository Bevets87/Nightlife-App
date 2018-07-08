import SearchBarContainer from './SearchBarContainer'
import FetchingContainer from './FetchingContainer'
import ErrorContainer from './ErrorContainer'
import BarsContainer from './BarsContainer'
import Bar from '../components/Bar'
import Patrons from '../components/Patrons'

import createFetchMachine from '../utils/createFetchMachine'
import createTree from '../utils/createTree'

const Components = {
  Fetch: SearchBarContainer,
  Fetching: FetchingContainer,
  Success: createTree(BarsContainer, Bar, Patrons),
  Failure: ErrorContainer 
}

export default createFetchMachine(Components)
