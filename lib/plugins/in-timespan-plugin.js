const utils = require('../utils')

/**
 * Return 1.0 if start <= time <= end, 0.0 otherwise.
 * @param time - time to be checked
 * @param start - begin of the timespan
 * @param end - end of the timespan
 */
function inTimespanPlugin (time, start, end) {
  if (end < start) {
    let tmp = start
    start = end
    end = tmp
  }
  return utils.isInRange(time, start, end) ? 1.0 : 0.0
}

module.exports = inTimespanPlugin
