const utils = require('../utils')

/**
  * Trims all whitespaces (left and right)
  *
  * @param string - string that should be transformed
**/
function trim (string) {
  utils.isValidString(string)
  return string.trim()
}

module.exports = trim
