const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const Customer = require('../models/customer')


loginRouter.post('/', async (req, res) => {
  try {
    const body = req.body
    const user = await Customer.findOne({ name: body.name })
    if (user === null) {
      return res.status(401).send({ error: 'Invalid username or password' })
    }
    const pswdOk = await bcrypt.compare(body.password, user.password)
    if (pswdOk)
      res.status(200).json(user)
    else
      return res.status(401).send({ error: 'Invalid username or password' })
  }
  catch (exception) {
    console.log(exception)
    res.status(500).json({ error: 'Unexpected error retrieving customers' })
  }
})


module.exports = loginRouter