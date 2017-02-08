const utils = require('../utils')

/**
  * extract number of day of week from timestamp
  *
  * @param number - timestamp from 1970-01-01 00:00:00 UTC (Unix Epoch)
**/
function monthNumberOfYear (number) {
  utils.isTimestamp(number)
  return (new Date(number * 1000)).getMonth() + 1
}

module.exports = monthNumberOfYear
