const dataRouter = require('express').Router()
let myData = require('../models/my-data')
// Id:n generointia varten
let maxId = 100


dataRouter.get('/', (req, res) => {
  res.json(myData)
})

dataRouter.get('/:id', (req, res) => {
  const id = Number(req.params.id)
  const data = myData.find(element => element.id === id)
  if (data === undefined)
    res.status(404).end()
  else
    res.json(data)
})

dataRouter.get('/index/:index', (req, res) => {
  const indexNum = Number(req.params.index)
  if (indexNum > myData.length - 1)
    res.status(404).send({ error: 'No such data' })
  else
    res.json(myData[indexNum])
})

dataRouter.delete('/', (req, res) => {
  let data = req.body
  const index = myData.findIndex(element => element.id === data.id)
  if (index < 0) {
    return res.status(400).json({ error: 'data not found' })
  }
  console.log('Deleting data:', index, data)
  console.log('Before', myData)
  myData.splice(index, 1)
  console.log('After', myData)
  res.status(204).end()
})

dataRouter.delete('/:id', (req, res) => {
  const id = Number(req.params.id)
  const data = myData.find(element => element.id === id)
  const index = myData.findIndex(element => element.id === id)
  console.log('Deleting data:', index, data)
  if (index < 0) {
    return res.status(400).json({ error: 'data not found' })
  }
  console.log('Before', myData)
  myData.splice(index, 1)
  console.log('After', myData)
  res.status(204).end()
})

dataRouter.post('/', (req, res) => {
  let data = req.body
  if (data.name === undefined) {
    return res.status(400).json({ error: 'content missing' })
  }
  console.log('Data:', data)
  data.id = ++maxId
  myData = myData.concat(data)
  // Palautetaan data, jossa on juuri annettu id mukana
  res.json(data)
})

dataRouter.put('/', (req, res) => {
  let data = req.body
  const index = myData.findIndex(element => element.id === data.id)
  if (index < 0) {
    return res.status(400).json({ error: 'data not found' })
  }
  console.log('Data:', data)
  for (let key in data) {
    console.log('Key:', key, ', Value:', data[key])
    if (key !== 'id')
      myData[index][key] = data[key]
  }
  res.status(201).end()
})


module.exports = dataRouter