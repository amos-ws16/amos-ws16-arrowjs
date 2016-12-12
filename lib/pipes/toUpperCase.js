const utils = require('../utils')

/**
  * Transform a string to upper case
  *
  * @param string - string that should be transformed
**/
function toUpperCase (string) {
  utils.isValidString(string)
  return string.toUpperCase()
}

