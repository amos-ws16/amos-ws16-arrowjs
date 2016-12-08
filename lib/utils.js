/**
 * Returns a copy of the given object. The object must be serializable to
 * JSON, thus cloning will only work on primitive objects.
 */
function cloneObject (obj) {
  return JSON.parse(JSON.stringify(obj))
}

/**
 * Check if a given string is a valid string
 *
 * @param sString - the string that needs to be checked
 */
function isValidString (sString) {
  if (typeof (sString) !== 'string') {
    throw new Error(`String expected, found ${sString}`)
  }
  if (sString === '') {
    throw new Error(`Non-empty string expected.`)
  }
}

/**
 * Check if given argument is a number n with min <= n <= max.
 *
 * @param n - the thing to be checked
 */
function isInRange (n, min, max) {
  return typeof n === 'number' && n >= min && n <= max
}

/**
  * Check if a given variable is a valid Integer
  *
  * @param int - variable/Integer that needs to be checked
**/
function isInteger (int) {
  if (typeof int !== 'number' || int % 1 !== 0) {
    throw new Error(`${int} is not a valid Integer.`)
  }
}

/**
  * Check if a given variable is a valid Timestamp
  *
  * @param timest - variable/Integer that needs to be checked
**/
function isTimestamp (timest) {
  if (typeof timest !== 'number') {
    throw new Error(`${timest} is not a valid Integer.`)
  }
}

module.exports = { cloneObject, isValidString, isInRange, isInteger, isTimestamp }
