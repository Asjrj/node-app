const customerRouter = require('express').Router()
const bcrypt = require('bcrypt')
const Customer = require('../models/customer')
const generateId = require('../utils/my-util').generateId


/* Using callbacks
customerRouter.get('/', (req, res) => {
  Customer
    .find({})
    .then(customers => {
      res.json(customers)
    })
})
*/

customerRouter.get('/', async (req, res) => {
  try {
    let customers = await Customer.find({})
    res.status(200).json(customers)
  }
  catch (exception) {
    console.log(exception)
    res.status(500).json({ error: 'Unexpected error retrieving customers' })
  }
})

// Get customer by ObjectId
customerRouter.get('/:id', async (req, res) => {
  try {
    let customer = await Customer.findById(req.params.id)
    res.status(200).json(customer)
  } catch (exception) {
    console.log(exception)
    res.status(500).json({ error: 'Unexpected error retrieving a customer' })
  }
})

// Creating a new customer - no transactions or events exist yet
customerRouter.post('/', async (req, res) => {
  try {
    let data = req.body
    if (data.name === undefined || data.password === undefined || data.email === undefined) {
      return res.status(400).json({ error: 'content missing' })
    }
    let customerFound = await Customer.find({ name: data.name })
    if (customerFound.length > 0) {
      return res.status(400).send({ error: 'Customer by given name already exists' })
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(data.password, saltRounds)
    const newRole = data.role === undefined ? 'User' : data.role
    const customer = new Customer({
      id: generateId(),
      name: data.name,
      email: data.email,
      password: passwordHash,
      role: newRole,
      address: { street: data.street, zip: data.zip, city: data.city, country: data.country }
    })
    const customerSaved = await customer.save()
    res.status(201).json(customerSaved)
  } catch (exception) {
    console.log(exception)
    res.status(500).json({ error: 'Unexpected error creating a customer' })
  }
})

// Update customer data
customerRouter.put('/:id', async (req, res) => {
  try {
    let data = req.body
    if (data.name === undefined) {
      return res.status(400).json({ error: 'content missing' })
    }
    const customer = {
      name: data.name,
      email: data.email,
      role: data.role,
      address: { street: data.address.street, zip: data.address.zip, city: data.address.city }
    }
    const customerSaved = await Customer.findByIdAndUpdate(req.params.id, customer, { new: true })
    res.status(201).json(customerSaved)
  } catch (exception) {
    console.log(exception)
    res.status(500).json({ error: 'Unexpected error changing a customer' })
  }
})

customerRouter.delete('/:id', async (req, res) => {
  try {
    await Customer.findByIdAndDelete(req.params.id)
    res.status(204).end()
  } catch (exception) {
    console.log(exception)
    res.status(500).json({ error: 'Unexpected error deleting a customer' })
  }
})

module.exports = customerRouter