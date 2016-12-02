const weightedMean = require('./weighted-mean')
/**
 * Return a WeightedMean Aggregator from an aggregator array. The parameters
 * will be forwarded to WeightedMean.constructor().
 */
function create (aggregators) {
  let weighted = aggregators.map(e => [1, e])
  return weightedMean.create(weighted)
}

module.exports = { create }
