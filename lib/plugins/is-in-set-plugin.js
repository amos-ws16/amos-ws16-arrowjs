/**
 *
 * @param varToCheck - a string which is checked whether it is contained in the set
 * @param setWhichIncludesVar - an array of strings which may includes the varToCheck-String
 * @return a score: 1.0 if the the varToCheck is found in setWhichIncludesVar or 0.0 if it's not found
 */
function isInSetPlugin (varToCheck, setWhichIncludesVar) {
  let found = false
  for (let x of setWhichIncludesVar) {
    if (x === varToCheck) {
      found = true
      break
    }
  }
  return found ? 1.0 : 0.0
}

module.exports = isInSetPlugin
