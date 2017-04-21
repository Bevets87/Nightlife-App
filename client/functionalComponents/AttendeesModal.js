import React from 'react'
import PropTypes from 'prop-types'

import './AttendeesModal.scss'

const AttendeesModal = (props) => {
  const { bars, handleAttendeesModal } = props
  return (
    <div>
      <div className='attendees-modal-container'>
        <div className='attendees-modal-header'>
          <h1>Guests</h1>
          <span className='glyphicon glyphicon-remove' aria-hidden='true' onClick={handleAttendeesModal}></span>
        </div>
        {bars.attendees.map(guest => <h3 key={guest.name}>{guest.name}</h3>)}
      </div>
    </div>
  )
}

AttendeesModal.propTypes = {
  bars: PropTypes.object,
  handleAttendeesModal: PropTypes.func
}

export default AttendeesModal
