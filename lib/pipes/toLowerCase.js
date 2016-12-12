const utils = require('../utils')

/**
  * Transform a string to lower case
  *
  * @param string - string that should be transformed
**/
function toLowerCase (string) {
  utils.isValidString(string)
  return string.toLowerCase()
}

