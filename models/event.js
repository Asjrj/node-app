const mongoose = require('mongoose')
const Schema = mongoose.Schema

const eventSchema = new Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'mycustomers'
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'myproducts'
  },
  time: Date,
  type: String,
  title: String,
  description: String,
  grade: Number
})

// The name of the collection is myevents
const Event = mongoose.model('myevent', eventSchema)

module.exports = Event