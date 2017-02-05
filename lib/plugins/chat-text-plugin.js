const extractObject = require('../extract-object.js')
const similarityPlugin = require('./similar-text-plugin.js')
const meanAggregator = require('../aggregators/mean.js')
const utils = require('../utils.js')

/**
 * Deletes all objects from chat array inside chat object not in timerange
 * For example:
 * const intervallChat = {
 * chat: [
 *   {
 *     'type': 'message',
 *     'text': 'Hello world',
 *     'channel': 'C2147483705',
 *     'user': 'U2147483697',
 *     'ts': 300
 *   },
 *   {
 *     'type': 'message',
 *     'text': 'Hello underworld',
 *     'channel': 'C2147483705',
 *     'user': 'U2147483697',
 *     'ts': 500
 *   }
 *  ]
 * }
 *
 * using: deleteChatMessagesNotInTimeIntervall(intervallChat, 400, 1000)
 * Deletes all chatobjects not in the ts range of 400 and 100
 */
function deleteChatMessagesNotInTimeIntervall (chat, startTime, endTime) {
  let transformedChat = chat
  for (let chatObj of transformedChat.chat) {
    if ((chatObj.ts < startTime) || (chatObj.ts > endTime)) {
      var index = transformedChat.chat.indexOf(chatObj)
      transformedChat.chat[index] = null
    }
  }
  transformedChat = transformedChat.chat.filter(Boolean)
  return transformedChat
}

/**
 * Takes as an input an object of the form:
 *
 * @param chat - an object that is a chat
 * @param text - an object that is a text
 * @return score - between 1.0 and 0.0. This is the mean value of all the
 * similarities between every single chat message and text.
 */
function chatComparisonPlugin (chat, text, params) {
  let startTime = (params && params['startTime']) || 1
  let endTime = (params && params['endTime']) || 9999999999
  let intervallChat = deleteChatMessagesNotInTimeIntervall(chat, startTime, endTime)
  let [messageText, e1] = extractObject(intervallChat, 'chat[].text')

  utils.isTimestamp(startTime)
  utils.isTimestamp(endTime)

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
