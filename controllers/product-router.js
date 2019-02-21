const productRouter = require('express').Router()
const Product = require('../models/product')

productRouter.get('/', (req, res) => {
  Product
  .find({})
  .then(products => {
    res.json(products)
  })
})

module.exports = productRouter