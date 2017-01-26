const scoreSource = require('./aggregators/score-source')

/**
 * TODO:
 */
function handleStar (args, scores) {
  if (args === '*') {
    return Object.keys(scores).map((pluginId) => scoreSource.create(pluginId))
  }
  return args
}

module.exports = { handleStar }

