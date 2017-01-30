const extractObject = require('../extract-object.js')
const similarityPlugin = require('./similar-text-plugin.js')
const meanAggregator = require('../aggregators/mean.js')
const utils = require('../utils.js')

/**
 * Takes as an input an object of the form:
 *
 * @param chat - an object that is a chat
 * @param text - an object that is a text
 * @return score - between 1.0 and 0.0. This is the mean value of all the
 * similarities between every single chat message and text.
 */
function chatComparisonPlugin (chat, text) {
  let [messageText, e1] = extractObject(chat, 'chat[].text')
  if (e1 !== null) {
    throw new Error('Error extracting text from chat.')
  }
  utils.isValidString(text)
  var singleMessageScores = []
  for (let message of messageText) {
    singleMessageScores.push(similarityPlugin(message, text))
  }

  return meanAggregator.create('*').eval(singleMessageScores)
}

module.exports = chatComparisonPlugin
