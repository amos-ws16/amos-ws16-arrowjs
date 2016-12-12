const extractObject = require('./extract-object')
const utils = require('./utils')
const InvalidInputError = require('./invalid-input-error')
const aggregatorConfigParser = require('../lib/aggregator-config-parser')
const pipeParser = require('../lib/parse-input-pipes')

/**
 * Throws an InvalidInputError if plugins[id] is not available.
 *
 * @param plugins - object with one property per plugin, whose keys are the
 *                  plugin names and whose values are the plugin's
 *                  configuration
 * @param id - the plugin name that must exist
 */
function ensurePluginExists (plugins, id) {
  if (!plugins.hasOwnProperty(id)) {
    throw new InvalidInputError(`Plugin not configured: ${id}`)
  }
}

/**
 * Throws an InvalidInputError if aggregator is not a valid score aggregator.
 *
 * @param aggregator - aggregator name to by dynamically loaded or an
 *                     aggregator object with a combine method
 */
function ensureValidAggregator (aggregator) {
  if (!aggregator) {
    throw new InvalidInputError(`Aggregator is missing`)
  }
}

/**
 * Throws an InvalidInputError if plugins is not a valid set of plugins.
 *
 * @param plugins - object whose keys are plugin names and values are plugin
 *                  configurations with the properties 'use' and 'inputs'
 */
function ensureValidPlugins (plugins) {
  if (!plugins) {
    throw new InvalidInputError(`Plugin configuration is missing`)
  }
  Object.keys(plugins).forEach((key) => {
    let plugin = plugins[key]
    if (!plugin.use) {
      throw new InvalidInputError(`Plugin's scoring function is missing: ${key}`)
    }
    if (!plugin.inputs) {
      throw new InvalidInputError(`Plugin's input paths are missing: ${key}`)
    }
    if (!Array.isArray(plugin.inputs) || plugin.inputs.length !== 2) {
      throw new InvalidInputError(`Plugin's inputs field is not an array of length 2: ${key}`)
    }
  })
}

/**
 * Throws an InvalidInputError if the configuration object passed is invalid.
 * See ScoreManager.constructor for details.
 *
 * @param config - the score manager configuration to be validated
 */
function ensureValidConfiguration (config) {
  if (!config) {
    throw new InvalidInputError(`ScoreManager configuration is missing`)
  }
  ensureValidAggregator(config.aggregator)
  ensureValidPlugins(config.plugins)
}

/**
 * Take an object where each property (key) has an array value of equal length
 * and return an array of that length where each element is an object with the
 * properties of the originial keysOfArrays but only a scalar value. Example:
 *
 *   { a: [1, 2, 3], b: [4, 5, 6] }                 will be transformed to
 *   [ {a: 1, b: 4}, {a: 2, b: 5}, {a: 3, b: 6} ]
 *
 * @param keysOfArrays - an object where each property has an array value
 */
function insideOut (keysOfArrays) {
  let len = Object.values(keysOfArrays)[0].length
  let arrayOfKeys = []
  for (let i = 0; i < len; i++) {
    let keys = {}
    Object.keys(keysOfArrays).forEach(k => {
      keys[k] = keysOfArrays[k][i]
    })

    arrayOfKeys[i] = keys
  }

  return arrayOfKeys
}

/**
 * Return the scoring function from the plugin configuration. If plugin.use is
 * set, then dynamically load the plugin from the /lib/plugins/ folder and
 * return it. Otherwise return the function in plugin.score.
 *
 * @param plugin - a single plugin's configuration
 */
function getScoringFunction (plugin) {
  return typeof plugin.use === 'string'
    ? utils.loadPlugin(plugin.use) : plugin.use
}

/**
 * There are three important concepts that facilitate assigning a score to
 * tasks representing the degree to which they match an uploaded file and it's
 * metadata: the ScoreManager, one or more Plugins and an Aggregator.
 *
 * A Plugin is a function that takes two argument - a file object that
 * contains meta data, for example the filename, size, time of upload and/or
 * the file contents, and a task object that contains meta data related to the
 * task, for example the task name. It returns a floating point numeric score
 * in the range 0.0 to 1.0 which describes the degree in which the file and
 * the task are correlated in the aspect that this particular Plugin is focused
 * on. For example, the `similar-context` Plugin will return 1.0 if the title of the
 * file is the same as the title of the task and 0.0 otherwise.
 *
 * An Aggregator is a policy that combines a set of scores that were previously
 * assigned to a task by multiple Plugins into a single final score value. For
 * more details see score-aggregator.js.
 *
 * The purpose of the ScoreManager is to provide the entry point for a scoring
 * request, delegate the data to multiple Plugins, and combine their individual
 * scores using an Aggregator.
 */
class ScoreManager {
  /**
   * Constructs a ScoreManager using the configuration given by config.
   *
   * Plugins are configured in the config.plugins property, which is an object
   * with properties whose keys are the plugin identifiers. The configuration
   * has the form:
   *   config.plugins = {
   *     'plugin-a': {
   *       use: pluginScoringFunction,
   *       inputs = ['path.to.first.input', 'path.to.second.input.array[].x']
   *     },
   *     'plugin-b': ...
   *   }
   * Each plugin's score field is a plugin function with two arguments. The
   * plugin will receive a subobject and a subobject array of the global input
   * data by means of the path, for example assume that
   *   blob = { a: { b: 'foo' }, c: [ { d: 'bar' }, { d: 'baz' } ] }
   * then the paths ['a.b', 'c[].d'] will refer to the values 'foo' and
   * ['bar', 'baz']. Thus, the plugin configured with this path will be called
   * with score('foo', 'bar') and score('foo', 'baz').
   *
   * The Aggregator is given as the config.aggregator property and must be an
   * object that has a combine(scoresObj) method, which will be called with a
   * scoresObj of the form
   *   scoresObj = {'plugin-a': score-of-a, 'plugin-b': score-of-b, ...}
   *
   * @param config - an object that provides the configuration for Plugins and
   *                 the Aggregator
   */
  constructor (config) {
    ensureValidConfiguration(config)

    this.plugins = config.plugins
    this.aggregatorConfig = config.aggregator
  }

  /**
   * Return the individual and aggregated Plugin scores for the given input
   * object. This will score in a one-to-many relationship and will return an
   * array of the form
   *   result = [
   *     {'plugin-a': score-a, 'plugin-b': score-b, 'total': aggregated-score},
   *     ...
   *   ]
   * The number of elements in the result array is defined by the number of
   * elements of the array in the input path (see ScoreManager.constructor()).
   *
   * @param blob - an object with metadata that will be processed by configured
   *               plugins
   */
  score (blob) {
    let scores = {}

    Object.keys(this.plugins).forEach(key => {
      scores[key] = this.scoreWith(key, blob)
    })

    scores = insideOut(scores)
    return scores.map(score => {
      let result = utils.cloneObject(score)
      let total = this.aggregate(score)
      result.total = total
      return result
    })
  }

  /**
   * Score the input data blob using the single plugin defined by pluginId.
   * This method will return an array of scores, one for each element in the
   * configured input array, for example:
   *   plugins = { 'foo': { use: fooFunction, inputs: ['a', 'b[]'] } }  and
   *   blob = { a: 'Hello', b: ['World', 'Goodbye'] }
   * will return
   *   [ fooFunction('Hello', 'World'), fooFunction('Hello', 'Goodbye') ].
   */
  scoreWith (pluginId, blob) {
    ensurePluginExists(this.plugins, pluginId)

    let plugin = this.plugins[pluginId]
    try {
      // inputs: [arg0, arg1]
      let [arg0, arg1] = plugin.inputs.map(i => {
        // Get pipes
        let pipes = pipeParser.getPipes(i)
        // Remove pipes from input
        i = pipeParser.removePipes(i)
        let value = extractObject(blob, i)
        // Apply pipes
        for (let pipe of pipes) {
          value = pipeParser.applyPipe(pipe, value)
        }
        return value
      })
      let scoringFnc = getScoringFunction(plugin)
      let scores = arg1.map(arg1 => {
        try {
          return scoringFnc(arg0, arg1, plugin.params)
        } catch (err) {
          return 'failure: ' + err.message
        }
      })
      return scores
    } catch (err) {
      return ['failure: input data does not match configuration: ' + err.message]
    }
  }

  /**
   * Calculate and return the total score given a map of plugin-ids -> scores.
   * Ignore any scores that are non-numeric or outside the valid range.
   *
   * @param scores - an object where each key is a plugin id and it's value is
   *                 score given by that plugin
   */
  aggregate (scores) {
    let successfulKeys = Object.keys(scores).filter(
      key => utils.isInRange(scores[key], 0.0, 1.0)
    )

    if (successfulKeys.length === 0) {
      return 'failed: no successful plugins'
    }

    let successfulScores = {}
    successfulKeys.forEach(key => { successfulScores[key] = scores[key] })

    let aggregatorParseTree = aggregatorConfigParser.parse(
      this.aggregatorConfig, successfulScores)
    return aggregatorParseTree.eval()
  }
}

/**
 * Return a new ScoreManager. This is a factory function whose main purpose is
 * the ease of testing modules depending on ScoreManager.
 */
function create (config) {
  return new ScoreManager(config)
}

module.exports = { create }
