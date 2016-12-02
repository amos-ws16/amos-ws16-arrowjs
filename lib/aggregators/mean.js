const weightedMean = require('./weighted-mean')

/**
 * Throw an error if aggregators is not a valid array of aggregators.
 * @param aggregators - the array to be checked
 */
function ensureValidAggregators (aggregators) {
  if (typeof aggregators === 'undefined') {
    throw new Error('Aggregator specification must be provided')
  }
  if (!Array.isArray(aggregators)) {
    throw new Error(`Aggregator specification must be an array of aggregators. Found: '${aggregators}'`)
  }
  aggregators.forEach(aggregator => {
    if (typeof aggregator.eval === 'undefined') {
      throw new Error(`Aggregator must provide eval() method: '${aggregator}'`)
    }
  })
}

/**
 * Return a WeightedMean Aggregator from an aggregator array. The parameters
 * will be forwarded to WeightedMean.constructor().
 */
function create (aggregators) {
  ensureValidAggregators(aggregators)
  let weighted = aggregators.map(e => [1, e])
  return weightedMean.create(weighted)
}

module.exports = { create }
