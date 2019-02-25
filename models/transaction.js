const mongoose = require('mongoose')
const Schema = mongoose.Schema

const transactionSchema = new Schema({
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
  price: String
})


// The name of the collection is mytransactions
const Transaction = mongoose.model('mytransaction', transactionSchema)

module.exports = Transaction