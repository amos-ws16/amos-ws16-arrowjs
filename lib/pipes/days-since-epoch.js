const utils = require('../utils')
const hoursSinceEpoch = require('./hours-since-epoch')

/**
  * extract days since Unix Epoch from timestamp
  *
  * @param number - timestamp from 1970-01-01 00:00:00 UTC (Unix Epoch)
**/
function daysSinceEpoch (number) {
  utils.isTimestamp(number)
  return Math.floor(hoursSinceEpoch(number) / 24)
}

module.exports = daysSinceEpoch
