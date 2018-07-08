import modeReducer from '../../../client/reducers/mode'
import { SET_MODE } from '../../../client/actions/mode/types'

describe('modeReducer', () => {

  const InitialState = 'fetch'
 
  it('should return the initial state', () => {
    const state = undefined
    const action = { type: null }
    expect(modeReducer(state, action)).toContain(InitialState)
  })

  it('can handle SET_MODE', () => {
    const state = undefined 
    const action = { type: SET_MODE, payload: 'fetching' }
    expect(modeReducer(state, action)).toContain('fetching')
  })

})