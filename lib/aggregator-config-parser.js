const scoreSource = require('./aggregators/score-source')
const mean = require('./aggregators/mean')
const max = require('./aggregators/max')

/** TODO */
function parse (config, scores) {
  if (typeof config === 'string') {
    let pluginScore = scores[config]
    if (typeof pluginScore === 'undefined') {
      throw new Error(`Score for plugin expected but not found: '${config}'`)
    }
    return scoreSource.create(pluginScore)
  }

  let aggregator = Object.keys(config)[0]
  let args = config[aggregator].map((element) => parse(element, scores))
  if (aggregator === 'mean') {
    return mean.create(args)
  }

  return max.create(args)
}

module.exports = { parse }
