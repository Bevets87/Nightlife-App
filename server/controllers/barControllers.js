import Bars from '../models/Bars'
import _ from 'lodash'

export const handle_get_bars = (req, res) => {
  //Protected Route add jwt verification
  Bars.find((err, bars) => {
    if(err) return console.error(err)
    res.json({bars})
  })
}

export const handle_create_bar = (req, res) => {
  //Protected Route add jwt verification
  console.log(req.body)
  const { bar_id, attendee } = req.body
  Bars.findOne({bar_id: bar_id}, (err, bar) => {
    if(err) return console.error(err)
    if (!bar) {
      const attendees = []
      attendees.push({
        name: attendee
      })
      bar = new Bars({
        bar_id: bar_id,
        attendees: attendees
      })
      bar.save((err, bar) => {
        if(err) return console.error(err)
        res.json({bar})
      })
    } else {
      const guest = _.find(bar.attendees, {name: attendee})
      if (guest) {
        const index = _.findIndex(bar.attendees, {name: attendee})
        bar.attendees.splice(index, 1)
        bar.save((err, bar) => {
          if(err) return console.error(err)
          res.json({bar})
        })
      } else {
        bar.attendees.push({
          name: attendee
        })
        bar.save((err, bar) => {
          if(err) return console.error(err)
          res.json({bar})
        })
      }
    }
  })
}
