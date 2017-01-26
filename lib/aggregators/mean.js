const weightedMean = require('./weighted-mean')
const utils = require('../utils')

/**
 * Return a WeightedMean Aggregator from an aggregator array. The parameters
 * will be forwarded to WeightedMean.constructor().
 */
function create (aggregators) {
  utils.ensureValidAggregators(aggregators)
  if (aggregators === '*') {
    return weightedMean.create('*')
  }

  let weighted = aggregators.map(e => [1, e])
  return weightedMean.create(weighted)
}

module.exports = { create }
