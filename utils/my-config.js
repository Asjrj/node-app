// On Heroku the application must listen on a specific port, which is confidured in process.env.PORT
let port = process.env.PORT || 5000
let dbUrl = process.env.MY_DB_URL

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
  dbUrl = process.env.MY_TEST_DB_URL
  port = 3003
}

module.exports = { port, dbUrl }