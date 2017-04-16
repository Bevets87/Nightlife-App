import mongoose from 'mongoose'
const Schema = mongoose.Schema

const listingSchema = new Schema({
  name: String,
  attendees: Array,
  date: String
})

const Listing = mongoose.model('listing', listingSchema)

export default Listing
