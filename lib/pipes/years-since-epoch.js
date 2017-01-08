const utils = require('../utils')

/**
  * extract months since Unix Epoch from timestamp
  *
  * @param number - timestamp from 1970-01-01 00:00:00 UTC (Unix Epoch)
**/
function monthsSinceEpoch (number) {
  utils.isTimestamp(number)
  var date = new Date(number * 1000)
  return (date.getUTCFullYear() - 1970)
}

module.exports = monthsSinceEpoch
