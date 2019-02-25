const productRouter = require('express').Router()
const Product = require('../models/product')
const generateId = require('../utils/my-util').generateId


productRouter.get('/', async (req, res) => {
  try {
    let products = await Product.find({})
    res.status(200).json(products)
  }
  catch (exception) {
    console.log(exception)
    res.status(500).json({ error: 'Unexpected error retrieving products' })
  }
})

// Get product by ObjectId
productRouter.get('/:id', async (req, res) => {
  try {
    let product = await Product.findById(req.params.id)
    res.status(200).json(product)
  } catch (exception) {
    console.log(exception)
    res.status(500).json({ error: 'Unexpected error retrieving a product' })
  }
})

// Creating a new product
productRouter.post('/', async (req, res) => {
  let data = req.body
  if (data.type === undefined || data.make === undefined || data.model === undefined) {
    return res.status(400).json({ error: 'content missing' })
  }
  let productFound = await Product.find({ type: data.type, make: data.make, model: data.model })
  if (productFound.length > 0) {
    return res.status(400).send({ error: 'product already exists' })
  }
  const product = new Product({
    id: generateId(),
    type: data.type,
    make: data.make,
    model: data.model,
    inStock: data.inStock,
    description: data.description,
    nrEvents: 0
  })
  const productSaved = await product.save()
  res.status(201).json(productSaved)
})

// Update product data
productRouter.put('/:id', async (req, res) => {
  try {
    let data = req.body
    if (data.type === undefined || data.make === undefined || data.model === undefined) {
      return res.status(400).json({ error: 'content missing' })
    }
    const product = {
      type: data.type,
      make: data.make,
      model: data.model,
      inStock: data.inStock,
      description: data.description,
      nrEvents: 0
    }
      const productSaved = await Product.findByIdAndUpdate(req.params.id, product, { new: true })
    res.status(201).json(productSaved)
  } catch (exception) {
    console.log(exception)
    res.status(500).json({ error: 'Unexpected error changing a product' })
  }
})

productRouter.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id)
    res.status(204).end()
  } catch (exception) {
    console.log(exception)
    res.status(500).json({ error: 'Unexpected error deleting a product' })
  }
})


module.exports = productRouter