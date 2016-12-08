const scoreSource = require('./aggregators/score-source')
const loadModule = require('./utils').loadModule

/**
 * Parse the configuration given in config and return an aggregator tree, that
 * can be evaluated using the tree's eval() method. The scores object provides
 * the mapping of all plugins to their score values.
 *
 * @param config - the configuration to be parsed
 * @param scores - the scores of all plugins mapped as scores[pluginId] -> val
 */
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
