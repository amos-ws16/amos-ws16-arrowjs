const utils = require('../utils')

/**
  * Trims the right whitespaces
  *
  * @param string - string that should be transformed
**/
function trimRight (string) {
  utils.isValidString(string)
  return string.trimRight()
}

module.exports = trimRight
