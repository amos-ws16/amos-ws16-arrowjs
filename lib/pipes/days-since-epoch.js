const utils = require('../utils')
const hoursSinceEpoch = require('./hours-since-epoch')

/**
  * extract days since Unix Epoch from timestamt
  *
  * @param number - timestamt from 1970-01-01 00:00:00 UTC (Unix Epoch)
**/
function daysSinceEpoch (number) {
  utils.isTimestamp(number)
  return Math.floor(hoursSinceEpoch(number) / 24)
}

module.exports = daysSinceEpoch
