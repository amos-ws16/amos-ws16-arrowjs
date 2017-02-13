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
  const beginningOfTime = 1
  const endOfTime = 9999999999
  let startTime = (params && params['startTime']) || beginningOfTime
  let endTime = (params && params['endTime']) || endOfTime
  let user = (params && params['user']) || '*'

  utils.isTimestamp(startTime)
  utils.isTimestamp(endTime)

  let chatInInterval = utils.filterChatByTime(chat, startTime, endTime)
  let chatByUserAndInterval = (user === '*' ? chatInInterval : utils.filterByUser(chatInInterval, user))

  const messages = chatByUserAndInterval.map(entry => entry.text).filter(entry => entry !== undefined)

  utils.arrayNotEmpty(messages)
  utils.isValidString(text)

  var singleMessageScores = []
  for (let message of messages) {
    if (typeof (message) === 'string') {
      singleMessageScores.push(similarityPlugin(message, text))
    }
  }

  return meanAggregator.create('*').eval(singleMessageScores)
}

module.exports = chatComparisonPlugin
