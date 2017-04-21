import mongoose from 'mongoose'
const Schema = mongoose.Schema

const barSchema = new Schema({
  bar_id: String,
  attendees: [
    {
      name: String
    }
  ]
})

const Bars = mongoose.model('bar', barSchema)

export default Bars
