const utils = require('../utils')

/**
  * Trims the left whitespaces
  *
  * @param string - string that should be transformed
**/
function trimLeft (string) {
  utils.isValidString(string)
  return string.trimLeft()
}

module.exports = trimLeft
