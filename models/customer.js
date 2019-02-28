const mongoose = require('mongoose')
const config = require('../utils/my-config')

mongoose
  .connect(config.dbUrl, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to database', config.dbUrl)
  })
  .catch(err => {
    console.log(err)
  })

const customerSchema = new mongoose.Schema({
  id: Number, 
  name: {type: String, required: true},
  email: String,
  role: String,
  password: String,
  transactions: Array,
  events: Array,
  address: {street: String, zip: String, city: String, country: String}
})

// Let's define an instance method (just an example)
customerSchema.methods.findOthersWithSameRole = function(cb) {
  return this.model('mycustomers').find({ role: this.role }, cb)
}

// The name of the collection is mycustomers
const Customer = mongoose.model('mycustomer', customerSchema)

module.exports = Customer