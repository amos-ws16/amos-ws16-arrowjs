const utils = require('../utils')
const keywordExtractor = require('keyword-extractor')

/**
  * Get the keywords of an array of chat messages
  *
  * @param chat - Array of messages, e.g [{type: 'message', text: 'text of the message'}, ...]
**/
function chat (chat) {
  utils.isArray(chat)
  let allMessages = ''

  for (let idx in chat) {
    let message = chat[idx]
    if (message.text) {
      allMessages = `${allMessages} ${message.text}`
    }
  }

  return getKeywords(allMessages)
}

/**
* Uses the keyword-extractor module to get the keywords from the description and then joins the array to a string
*
* @param string - a string
*/
function getKeywords (string) {
  return keywordExtractor.extract(string, {
    language: 'english',
    remove_digits: true,
    return_changed_case: true,
    remove_duplicates: false
  }).join(' ')
}

module.exports = chat
