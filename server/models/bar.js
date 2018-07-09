const mongoose = require('mongoose')
const patronSchema = require('./patron')


const barSchema = new mongoose.Schema({
  yelp_id: {
    type: String,
    required: true
  },
  patrons: [ patronSchema ]
})

barSchema.methods.toClient = function() {
  return {
    yelp_id: this.yelp_id,
    patrons: this.patrons,
    going: this.patrons.length
  }
}

barSchema.statics.findAllByYelpIds = function(yelp_ids) {
  const $match = { yelp_id: { $in: yelp_ids } }
  const $project = { yelp_id: 1, patrons: 1 }
  return this.aggregate([{ $match }, { $project }])
}

barSchema.statics.addPatron = function(patron) {
  return this.findOneAndUpdate({ yelp_id: patron.yelp_id }, { $push: { patrons: { email: patron.email } } }, { upsert: true, new: true })
}


barSchema.statics.removePatron = function(patron) {
  return this.findOneAndUpdate({ yelp_id: patron.yelp_id }, { $pull: { patrons: { email: patron.email } } }, { new: true })
    .then(bar => bar.patrons.length ? Promise.resolve(bar) : bar.remove())
}

module.exports = mongoose.model('Bar', barSchema)



