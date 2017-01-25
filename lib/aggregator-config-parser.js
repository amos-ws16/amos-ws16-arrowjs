const scoreSource = require('./aggregators/score-source')
// const nullSource = require('./aggregators/null-source')
const loadModule = require('./utils').loadModule
const InvalidInputError = require('./invalid-input-error')

/**
 * Parse the argument part of an aggregator configuration, which can either be
 * a '*', a single aggregator config, or an array of aggregator configs, and
 * return the aggregator parse tree.
 * @param args - the argument to a aggregator
 * @param scores - the scores of all plugins mpaped as scores[pluginId] -> val
 */
function parseArgument (args) {
  if (args === '*') {
    // * means all available plugins.
    return '*'
  }
  if (Array.isArray(args)) {
    return args.map(element => parse(element))
  }
  return parse(args)
}

/**
 * Parse the configuration given in config and return an aggregator tree, that
 * can be evaluated using the tree's eval() method. The scores object provides
 * the mapping of all plugins to their score values.
 *
 * @param config - the configuration to be parsed
 * @param scores - the scores of all plugins mapped as scores[pluginId] -> val
 */
function parse (config) {
  if (typeof config === 'string') {
    // let pluginScore = scores[config]
    // if (typeof pluginScore === 'undefined') {
    //   return nullSource.create()
    // }
    return scoreSource.create(config)
  }

  if (typeof config === 'number') { return config }

  if (Array.isArray(config)) {
    return config.map((element) => parse(element))
  }

  // It is not a primitive: assume it is a aggregator { 'name': [args] }.
  let id = Object.keys(config)[0]
  let args = config[id]

  args = parseArgument(args)
  let aggregator = (() => {
    try {
      return loadModule('aggregators', id)
    } catch (err) {
      throw new InvalidInputError(`Aggregator '${id}' does not exist.`)
    }
  })()

  return aggregator.create(args)
}

module.exports = { parse }
