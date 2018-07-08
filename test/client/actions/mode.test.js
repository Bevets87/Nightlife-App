import {
  setMode
} from '../../../client/actions/mode'

import {
  SET_MODE
} from '../../../client/actions/mode/types'

describe('Mode actions', () => {
  it('creates an action of type SET_MODE and payload mode', () => {
    const mode = 'fetching'
    const action = setMode(mode)
    expect(action.type).toBe(SET_MODE)
    expect(action.payload).toContain('fetching')
  })
})