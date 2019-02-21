const customerRouter = require('express').Router()
const Customer = require('../models/customer')
const generateId = require('../utils/my-util').generateId()


customerRouter.get('/', (req, res) => {
  Customer
    .find({})
    .then(customers => {
      res.json(customers)
    })
})

customerRouter.get('/:id', (req, res) => {
  const id = Number(req.params.id)
  const data = myData.find(element => element.id === id)
  if (data === undefined)
    res.status(404).end()
  else
    res.json(data)
})

customerRouter.get('/index/:index', (req, res) => {
  const indexNum = Number(req.params.index)
  if (indexNum > myData.length - 1)
    res.status(404).send({ error: 'No such data' })
  else
    res.json(myData[indexNum])
})

customerRouter.delete('/', (req, res) => {
  let data = req.body
  const index = myData.findIndex(element => element.id === data.id)
  if (index < 0) {
    return res.status(400).json({ error: 'data not found' })
  }
  // splice changes myData as a side effect
  myData.splice(index, 1)
  res.status(204).end()
})

customerRouter.delete('/:id', (req, res) => {
  const id = Number(req.params.id)
  const data = myData.find(element => element.id === id)
  const index = myData.findIndex(element => element.id === id)
  if (index < 0) {
    return res.status(400).json({ error: 'data not found' })
  }
  // splice changes myData as a side effect
  myData.splice(index, 1)
  res.status(204).end()
})

customerRouter.post('/', (req, res) => {
  let data = req.body
  if (data.name === undefined) {
    return res.status(400).json({ error: 'content missing' })
  }
  data.id = generateId()
  myData = myData.concat(data)
  // Return data with newly generated id 
  res.json(data)
})

customerRouter.put('/', (req, res) => {
  let data = req.body
  const index = myData.findIndex(element => element.id === data.id)
  if (index < 0) {
    return res.status(400).json({ error: 'data not found' })
  }
  for (let key in data) {
    if (key !== 'id')
      myData[index][key] = data[key]
  }
  res.status(201).end()
})

module.exports = customerRouter