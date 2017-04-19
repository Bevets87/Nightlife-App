import axios from 'axios'

export const SET_ATTENDEES = 'SET_ATTENDEES'

export function createAttendee (attendee) {
  return function() {
    return axios.post('/api/attendees', attendee)
  }
}
