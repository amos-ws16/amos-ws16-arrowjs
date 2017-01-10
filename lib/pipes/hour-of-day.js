const utils = require('../utils')

/**
  * extract hour of day from timestamp 0 to 23
  *
  * @param number - timestamp from 1970-01-01 00:00:00 UTC (Unix Epoch)
**/
function hourOfDay (number) {
  utils.isTimestamp(number)
  return (new Date(number * 1000)).getUTCHours()
}

module.exports = hourOfDay
