/**
 * Representation of an Aggregator, that can calculate a generalization of the
 * logical 'not' operation on floating point numbers in [0.0, 1.0], where the
 * edge cases of 1.0 and 0.0 will reproduce the behaviour of logical and with
 * true and false respectively.
 */
class Not {
  /**
   * Construct a Not Aggregator using aggregator.
   * @param aggregator - an aggregator whose value will be negated
   */
  constructor (aggregator) {
    this.aggregator = aggregator
  }

  /**
   * Returns the score of this Not Aggregator.
   */
  eval () {
    return 1.0 - this.aggregator.eval()
  }
}

/**
 * Return an Not Aggregator from an aggregator array. The parameters
 * will be forwarded to Not.constructor().
 */
function create (...args) {
  return new Not(...args)
}

module.exports = { create }
