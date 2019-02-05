const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const myConfig = require('./utils/my-config')
const myMiddleware = require('./utils/my-middleware')
const myDataRouter = require('./controllers/data-router')


app.use(cors())
app.use(bodyParser.json())
app.use(myMiddleware)
app.use('/api/data', myDataRouter)


app.get('/', (req, res) =>
  res.send('<h1>Node and Express REST API example</h1><p>Usage: <a href="https://agile-temple-75130.herokuapp.com/api/data/">https://agile-temple-75130.herokuapp.com/api/data/</a></p>'))


app.listen(myConfig.port, () => console.log(`Backend listening on port ${myConfig.port}!`))
