/**
 * Representation of an Aggregator, that can calculate a generalization of the
 * logical 'and' operation on floating point numbers in [0.0, 1.0], where the
 * edge cases of 1.0 and 0.0 will reproduce the behaviour of logical and with
 * true and false respectively.
 */
class And {
  /**
   * Construct a And Aggregator using an array of aggregators.
   * @param aggregators - an array of aggregators
   */
  constructor (aggregators) {
    this.aggregators = aggregators
  }

  /**
   * Returns the score of this And Aggregator.
   */
  eval () {
    return this.aggregators.reduce((and, element) => and * element.eval(), 1.0)
  }
}

/**
 * Return an And Aggregator from an aggregator array. The parameters
 * will be forwarded to And.constructor().
 */
function create (...args) {
  return new And(...args)
}

module.exports = { create }
