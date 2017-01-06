const utils = require('../utils')

/**
  * extract months since Unix Epoch from timestamt
  *
  * @param number - timestamt from 1970-01-01 00:00:00 UTC (Unix Epoch)
**/
function monthsSinceEpoch (number) {
  utils.isTimestamp(number)
  var date = new Date(number * 1000)
  return (date.getFullYear() - 1970)
}

module.exports = monthsSinceEpoch
