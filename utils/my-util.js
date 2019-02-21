function generateId() {
  // msec from beginning of year 2019
  return (new Date().getTime() - 1546293600000)
}

module.exports = { generateId }