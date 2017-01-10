const utils = require('../utils')
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

/**
  * extract day of week from timestamp
  *
  * @param number - timestamp from 1970-01-01 00:00:00 UTC (Unix Epoch)
**/
function dayOfWeek (number) {
  utils.isTimestamp(number)
  return daysOfWeek[(new Date(number * 1000)).getUTCDay()]
}

module.exports = dayOfWeek
