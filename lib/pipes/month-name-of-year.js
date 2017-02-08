const utils = require('../utils')
const monthsOfYear = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December']

/**
  * extract name of day of week from timestamp
  *
  * @param number - timestamp from 1970-01-01 00:00:00 UTC (Unix Epoch)
**/
function monthNameOfYear (number) {
  utils.isTimestamp(number)
  return monthsOfYear[(new Date(number * 1000)).getMonth()]
}

module.exports = monthNameOfYear
