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
  name: String,
  address: {street: String, zip: String, city: String}
})

// The name of the collection is mycustomers
const Customer = mongoose.model('mycustomer', customerSchema)

module.exports = Customer