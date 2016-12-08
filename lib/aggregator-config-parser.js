const scoreSource = require('./aggregators/score-source')
const loadModule = require('./utils').loadModule

/** TODO */
function parse (config, scores) {
  if (typeof config === 'string') {
    let pluginScore = scores[config]
    if (typeof pluginScore === 'undefined') {
      throw new Error(`Score for plugin expected but not found: '${config}'`)
    }
    return scoreSource.create(pluginScore)
  }

  let id = Object.keys(config)[0]
  let args = config[id].map((element) => parse(element, scores))
  let aggregator = loadModule('aggregators', id)

  return aggregator.create(args)
}

module.exports = { parse }
