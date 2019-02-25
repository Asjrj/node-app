const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const myConfig = require('./utils/my-config')
const myMiddleware = require('./utils/my-middleware')
const myCustomerRouter = require('./controllers/customer-router')
const myProductRouter = require('./controllers/product-router')
const myEventRouter = require('./controllers/event-router')
const myTransactionRouter = require('./controllers/transaction-router')
const mongoose = require('mongoose')

app.use(cors())
app.use(bodyParser.json())
app.use(myMiddleware)
app.use('/api/customers', myCustomerRouter)
app.use('/api/products', myProductRouter)
app.use('/api/events', myEventRouter)
app.use('/api/transactions', myTransactionRouter)

app.get('/', (req, res) => {
  //res.send('<h1>Node and Express REST API example</h1><p>Usage: <a href="https://agile-temple-75130.herokuapp.com/api/data/">https://agile-temple-75130.herokuapp.com/api/data/</a></p>'))
  res.send('<h1>Node and Express REST API example</h1>')
})

app.listen(myConfig.port, () => console.log(`Backend listening on port ${myConfig.port}!`))
app.on('close', () => {
  mongoose.connection.close()
})
