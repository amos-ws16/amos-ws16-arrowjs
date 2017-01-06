const utils = require('../utils')
const daysSinceEpoch = require('./days-since-epoch')
/**
  * extract months since Unix Epoch from timestamt
  *
  * @param number - timestamt from 1970-01-01 00:00:00 UTC (Unix Epoch)
**/
function weeksSinceEpoch (number) {
  utils.isTimestamp(number)
  return Math.floor(daysSinceEpoch(number) / 7)
}

module.exports = weeksSinceEpoch