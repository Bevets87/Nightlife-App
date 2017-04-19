import mongoose from 'mongoose'
const Schema = mongoose.Schema

const attendeesSchema = new Schema({
  bar_id: String,
  attendees: Array,
  date: String
})

const Attendees = mongoose.model('attendees', attendeesSchema)

export default Attendees
