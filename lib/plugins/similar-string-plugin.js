const stringSimilarity = require('string-similarity')

/**
 * Returns a comparing score of two strings based on Dice's Coefficient using
 * the stringSimilarity module.
 */
function similarStringPlugin (leftString, rightString) {
  return stringSimilarity.compareTwoStrings(leftString, rightString)
}

module.exports = similarStringPlugin
