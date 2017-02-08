const extractObject = require('../extract-object.js')
const similarityPlugin = require('./similar-text-plugin.js')
const meanAggregator = require('../aggregators/mean.js')
const utils = require('../utils.js')

/**
 * Takes as an input an object of the form:
 *
 * @param chat - an object that is a chat
 * @param text - an object that is a text
 * @param params - an object of objects startTime, endTime, users
 * startTime and endTime are timestamps to set a time interval
 * users is either a single user as test or a array of text for multiple users
 * if params are set the chat will be filtered for the time interval and / or the
 * users specified
 * @return score - between 1.0 and 0.0. This is the mean value of all the
 * similarities between every single chat message and text.
 */
function chatComparisonPlugin (chat, text, params) {
  let startTime = (params && params['startTime']) || 1
  let endTime = (params && params['endTime']) || 9999999999
  let user = (params && params['user']) || '*'

  utils.isTimestamp(startTime)
  utils.isTimestamp(endTime)

  let intervallChat = utils.getChatMessagesInTimeInterval(chat, startTime, endTime)
  let finalTransChat = (user === '*' ? intervallChat : utils.getChatMessagesFromUsers(intervallChat, user))

  let [messageText, e1] = extractObject(finalTransChat, 'chat[].text')

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
