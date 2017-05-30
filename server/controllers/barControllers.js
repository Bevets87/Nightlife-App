import jwt from 'jsonwebtoken'
import Bars from '../models/Bars'
import _ from 'lodash'
import { JWT_SECRET } from '../../env'

export const handle_get_bars = (req, res) => {
  Bars.find((err, bars) => {
    if (err) return console.error(err)
    res.json({bars})
  })
}

export const handle_create_bar = (req, res) => {

  const { bar_id, attendee, token } = req.body

  jwt.verify(token, process.env.JWT_SECRET || JWT_SECRET, (err, decoded) => {
    console.log(err)
    if (!err) {
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
    } else {
      res.status(401).send('Invalid user!');
    }
  })
}
