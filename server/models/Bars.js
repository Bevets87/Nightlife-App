import mongoose from 'mongoose'
const Schema = mongoose.Schema

const barSchema = new Schema({
  bar_id: String,
  attendees: [
    {
      name: String,
      createdAt: {
        type: Date,
        expires: '24h',
        default: Date.now
      }
    }
  ]
})

const Bars = mongoose.model('bar', barSchema)

export default Bars
