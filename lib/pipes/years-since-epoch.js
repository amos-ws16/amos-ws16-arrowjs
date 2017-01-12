const utils = require('../utils')

/**
  * extract years since Unix Epoch from timestamp
  *
  * @param number - timestamp from 1970-01-01 00:00:00 UTC (Unix Epoch)
**/
function yearsSinceEpoch (number) {
  utils.isTimestamp(number)
  var date = new Date(number * 1000)
  return (date.getUTCFullYear() - 1970)
}

module.exports = yearsSinceEpoch
