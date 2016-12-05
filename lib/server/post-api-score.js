const VError = require('verror').VError

const config = require('../../config')
const scoreManager = require('../score-manager')

/**
 * Handle the request req on POST /api/score and use res to respond.
 */
function postApiScore (req, res) {
  let requestConfig = req.body.config || config.scoreManager
  try {
    let manager = scoreManager.create(requestConfig)
    let result = manager.score(req.body)

    // If there was no exception up to this point, we have success.
    res.json({ success: true, result: result })
  } catch (err) {
    if (VError.hasCauseWithName(err, 'InvalidInputError')) {
      res.json({ success: false, error: err.message })
      return
    }

    res.json({ success: false, error: 'Internal Server Error' })
    throw err
  }
}

module.exports = postApiScore
