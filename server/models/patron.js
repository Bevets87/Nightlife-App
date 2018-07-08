import mongoose from 'mongoose'

const patronSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    expires: '24h',
    default: Date.now
  }
})

export default patronSchema 