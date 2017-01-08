const utils = require('../utils')
const daysSinceEpoch = require('./days-since-epoch')
/**
  * extract weeks since Unix Epoch from timestamp
  *
  * @param number - timestamp from 1970-01-01 00:00:00 UTC (Unix Epoch)
**/
function weeksSinceEpoch (number) {
  utils.isTimestamp(number)
  return Math.floor(daysSinceEpoch(number) / 7)
}

module.exports = weeksSinceEpoch
