import { SET_ATTENDEES } from '../actions/attendeeActions'

const DEFAULT_STATE = {
  attendees: []
}

const setAttendees = (state, action) => {
  return Object.assign(
    {},
    state,
    {
      attendees: action.attendees
    }
  )
}

const attendeeReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
  case SET_ATTENDEES:
    return setAttendees(state, action)
  default:
    return state
  }
}

export default attendeeReducer
