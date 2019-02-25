const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  id: Number, 
  type: String, 
  make: String, 
  model: String, 
  price: Number, 
  inStock: Number,
  description: String,
  nrEvents: Number
})

// The name of the collection is myproducts
const Product = mongoose.model('myproduct', productSchema)

module.exports = Product