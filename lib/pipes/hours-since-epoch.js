const utils = require('../utils')

/**
  * extract hours since Unix Epoch from timestamp
  *
  * @param number - timestamp from 1970-01-01 00:00:00 UTC (Unix Epoch)
**/
function hoursSinceEpoch (number) {
  utils.isTimestamp(number)
  return Math.floor(number / 60 / 60)
}

module.exports = hoursSinceEpoch
