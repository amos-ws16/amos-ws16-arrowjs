const utils = require('../utils.js')

/**
 *
 * @param varToCheck - a string which is checked whether it is contained in the set
 * @param setWhichIncludesVar - an array of strings which may include the varToCheck-String
 * @return a score: 1.0 if the the varToCheck is found in setWhichIncludesVar or 0.0 if it's not found
 */
function isInSetPlugin (varToCheck, setWhichIncludesVar) {
  let found = false

  if ((typeof varToCheck === 'undefined') || (typeof setWhichIncludesVar === 'undefined')) {
    throw new Error(`Two inputs are needed.`)
  }

  utils.isArray(setWhichIncludesVar)

  for (let x of setWhichIncludesVar) {
    if (typeof x !== typeof varToCheck) {
      throw new Error(`Type of ${varToCheck} not matching type of input array`)
    }
  }

  for (let x of setWhichIncludesVar) {
    if (x === varToCheck) {
      found = true
      break
    }
  }
  return found ? 1.0 : 0.0
}

module.exports = isInSetPlugin
