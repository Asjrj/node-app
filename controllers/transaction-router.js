const transactionRouter = require('express').Router()
const Transaction = require('../models/transaction')
const generateId = require('../utils/my-util').generateId


transactionRouter.get('/', async (req, res) => {
  try {
    let transactions = await Transaction.find({})
    res.status(200).json(transactions)
  }
  catch (exception) {
    console.log(exception)
    res.status(500).json({ error: 'Unexpected error retrieving transactions' })
  }
})

// Get transaction by ObjectId
transactionRouter.get('/:id', async (req, res) => {
  try {
    let transaction = await Transaction.findById(req.params.id)
    res.status(200).json(transaction)
  } catch (exception) {
    console.log(exception)
    res.status(500).json({ error: 'Unexpected error retrieving a transaction' })
  }
})

// Creating a new transaction - no transactions or transactions exist yet
transactionRouter.post('/', async (req, res) => {
  let data = req.body
  if (data.type === undefined || data.title === undefined) {
    return res.status(400).json({ error: 'content missing' })
  }
  const transaction = new Transaction({
    id: generateId(),
    customer: data.customer,
    product: data.product,
    time: new Date(),
    type: data.type,
    price: data.price
  })
  console.log('EVENT:', transaction)
  const transactionSaved = await transaction.save()
  console.log('EVENT:', transactionSaved)
  res.status(201).json(transactionSaved)
})

// Update transaction data
transactionRouter.put('/:id', async (req, res) => {
  try {
    let data = req.body
    if (data.type === undefined || data.title === undefined) {
      return res.status(400).json({ error: 'content missing' })
    }
    const transaction = {
      customer: data.customer,
      product: data.product,
      time: new Date(),
      type: data.type,
      price: data.price
    }
    const transactionSaved = await Transaction.findByIdAndUpdate(req.params.id, transaction, { new: true })
    res.status(201).json(transactionSaved)
  } catch (exception) {
    console.log(exception)
    res.status(500).json({ error: 'Unexpected error changing a transaction' })
  }
})

transactionRouter.delete('/:id', async (req, res) => {
  try {
    await Transaction.findByIdAndDelete(req.params.id)
    res.status(204).end()
  } catch (exception) {
    console.log(exception)
    res.status(500).json({ error: 'Unexpected error deleting a transaction' })
  }
})

module.exports = transactionRouter