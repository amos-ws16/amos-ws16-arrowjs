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

  if (typeof config === 'number') { return config }

  if (Array.isArray(config)) {
    return config.map((element) => parse(element, scores))
  }

  // It is not a primitive: assume it is a aggregator { 'name': [args] }.
  let id = Object.keys(config)[0]
  let args = config[id].map((element) => parse(element, scores))
  let aggregator = loadModule('aggregators', id)

  return aggregator.create(args)
}

module.exports = { parse }
