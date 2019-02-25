const eventRouter = require('express').Router()
const Event = require('../models/event')
const generateId = require('../utils/my-util').generateId


eventRouter.get('/', async (req, res) => {
  try {
    let events = await Event.find({})
    res.status(200).json(events)
  }
  catch (exception) {
    console.log(exception)
    res.status(500).json({ error: 'Unexpected error retrieving events' })
  }
})

// Get event by ObjectId
eventRouter.get('/:id', async (req, res) => {
  try {
    let event = await Event.findById(req.params.id)
    res.status(200).json(event)
  } catch (exception) {
    console.log(exception)
    res.status(500).json({ error: 'Unexpected error retrieving a event' })
  }
})

// Creating a new event - no transactions or events exist yet
eventRouter.post('/', async (req, res) => {
  let data = req.body
  if (data.type === undefined || data.title === undefined) {
    return res.status(400).json({ error: 'content missing' })
  }
  const event = new Event({
    id: generateId(),
    customer: data.customer,
    product: data.product,
    time: new Date(),
    type: data.type,
    title: data.title,
    description: data.description,
    grade: data.grade
  })
  const eventSaved = await event.save()
  res.status(201).json(eventSaved)
})

// Update event data
eventRouter.put('/:id', async (req, res) => {
  try {
    let data = req.body
    if (data.type === undefined || data.title === undefined) {
      return res.status(400).json({ error: 'content missing' })
    }
    const event = {
      customer: data.customer,
      product: data.product,
      time: new Date(),
      type: data.type,
      title: data.title,
      description: data.description,
      grade: data.grade
    }
    const eventSaved = await Event.findByIdAndUpdate(req.params.id, event, { new: true })
    res.status(201).json(eventSaved)
  } catch (exception) {
    console.log(exception)
    res.status(500).json({ error: 'Unexpected error changing a event' })
  }
})

eventRouter.delete('/:id', async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id)
    res.status(204).end()
  } catch (exception) {
    console.log(exception)
    res.status(500).json({ error: 'Unexpected error deleting a event' })
  }
})

module.exports = eventRouter