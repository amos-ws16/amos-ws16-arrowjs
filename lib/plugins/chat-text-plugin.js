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
function chatComparisonPlugin (chat, text, params) {
  let [messageText, e1] = extractObject(chat, 'chat[].text')
  let timestamp = (params && params['timestamp']) || 1

  utils.isTimestamp(timestamp)

  if ((e1 !== null) && (e1.constructor === Error)) {
    throw new Error('Error extracting text from chat.')
  }

  utils.arrayNotEmpty(messageText)
  utils.isValidString(text)
  var singleMessageScores = []
  for (let message of messageText) {
    if ((message !== undefined) && (typeof (message) === 'string')) {
      singleMessageScores.push(similarityPlugin(message, text))
    }
  }

  return meanAggregator.create('*').eval(singleMessageScores)
}

module.exports = chatComparisonPlugin
