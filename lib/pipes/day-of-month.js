const utils = require('../utils')

/**
  * extract day of month from timestamp
  *
  * @param number - timestamp from 1970-01-01 00:00:00 UTC (Unix Epoch)
**/
function dayOfMonth (number) {
  utils.isTimestamp(number)
  return (new Date(number * 1000)).getUTCDate()
}

module.exports = dayOfMonth
