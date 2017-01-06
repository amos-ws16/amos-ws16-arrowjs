const utils = require('../utils')
const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

/**
  * extract day of week from timestamt
  *
  * @param number - timestamt from 1970-01-01 00:00:00 UTC (Unix Epoch)
**/
function dayOfWeek (number) {
  utils.isTimestamp(number)
  return daysOfWeek[(new Date(number * 1000)).getDay()]
}

module.exports = dayOfWeek
