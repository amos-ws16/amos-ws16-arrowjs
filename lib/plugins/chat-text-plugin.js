const extractObject = require('../extract-object.js')
const similarityPlugin = require('./similar-text-plugin.js')
const meanAggregator = require('../aggregators/mean.js')

var mean = meanAggregator.create('*')
/**
 * Takes as an input an object of the form:
 *
 * @param chat - an object that is a chat
 * @param text - an object that is a text
 * @return score - between 1.0 and 0.0
 */
function chatComparisonPlugin (chat, text) {
  let [messageText, e1] = extractObject(chat, 'chat[].text')
  if (e1 !== null) {
    for (let e of e1) {
      throw e
    }
  }
  var singleMessageScores = []
  for (let message of messageText) {
    singleMessageScores.push(similarityPlugin(message, text))
  }
  console.log('Single scores: ' + singleMessageScores)
  return mean.eval(singleMessageScores)
}

module.exports = chatComparisonPlugin
