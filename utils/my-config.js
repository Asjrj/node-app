let port = process.env.MY_BACKEND_PORT || 5000
let dbUrl = process.env.MY_DB_URL

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
  dbUrl = process.env.MY_TEST_DB_URL
  port = 3003
}

module.exports = { port, dbUrl }