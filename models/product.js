const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  id: Number, 
  class: String, 
  make: String, 
  model: String, 
  price: Number, 
  instock: Number
})

// The name of the collection is myproducts
const Product = mongoose.model('myproduct', productSchema)

module.exports = Product