const utils = require('../utils')

/**
  * extract days since Unix Epoch from timestamt
  *
  * @param number - timestamt from 1970-01-01 00:00:00 UTC (Unix Epoch)
**/
function daysSinceEpoch (number) {
  utils.isTimestamp(number)
  return Math.floor(number / 60 / 60)
}

module.exports = daysSinceEpoch
