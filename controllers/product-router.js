const productRouter = require('express').Router()
const Product = require('../models/product')

// Id:n generointia varten
let maxId = 100


productRouter.get('/', (req, res) => {
  Product
  .find({})
  .then(products => {
    res.json(products)
  })
})

module.exports = productRouter