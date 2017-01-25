const buster = require('buster')
const AggregatorConfigParser = require('../lib/aggregator-config-parser')

buster.testCase('AggregatorConfigParser', {
  'should take a single plugin id and return the plugins score': function () {
    let scores = { 'plugin-a': 0.5 }
    let config = 'plugin-a'
    let abstractSyntaxTree = AggregatorConfigParser.parse(config)

    buster.assert.near(abstractSyntaxTree.eval(scores), 0.5, 1e-3)
  },

  'should take a single plugin id and return the plugins score (2)': function () {
    let scores = { 'plugin-a': 0.9 }
    let config = 'plugin-a'
    let abstractSyntaxTree = AggregatorConfigParser.parse(config)

    buster.assert.near(abstractSyntaxTree.eval(scores), 0.9, 1e-3)
  },

  'should take a single plugin id and return the plugins score (3)': function () {
    let scores = { 'plugin-b': 0.9 }
    let config = 'plugin-b'
    let abstractSyntaxTree = AggregatorConfigParser.parse(config)

    buster.assert.near(abstractSyntaxTree.eval(scores), 0.9, 1e-3)
  },

  'should take two plugin ids and return the plugin\'s mean score': function () {
    let scores = { 'plugin-a': 0.5, 'plugin-b': 0.9 }
    let config = { 'mean': ['plugin-b', 'plugin-a'] }
    let abstractSyntaxTree = AggregatorConfigParser.parse(config)

    buster.assert.near(abstractSyntaxTree.eval(scores), 0.7, 1e-3)
  },

  'should take two plugin ids and return the plugin\'s mean of mean scores': function () {
    let scores = { 'plugin-a': 0.5, 'plugin-b': 0.9 }
    let config = { 'mean': [ { 'mean': ['plugin-b', 'plugin-a'] }, 'plugin-a' ] }
    let abstractSyntaxTree = AggregatorConfigParser.parse(config)

    buster.assert.near(abstractSyntaxTree.eval(scores), 0.6, 1e-3)
  },

  'should return source which evaluates to null when plugin was not found / did not compute a score': function () {
    let scores = {}
    let config = 'plugin-a'
    let abstractSyntaxTree = AggregatorConfigParser.parse(config)
    buster.assert.isNull(abstractSyntaxTree.eval(scores))
  },

  'should return source which evaluates to null when plugin was not found but other plugins are present': function () {
    let scores = { 'plugin-a': 0.5, 'plugin-b': 0.9 }
    let config = 'plugin-c'
    let abstractSyntaxTree = AggregatorConfigParser.parse(config)
    buster.assert.isNull(abstractSyntaxTree.eval(scores))
  },

  'should be able to use multiple aggregators': function () {
    let scores = { 'plugin-a': 0.5, 'plugin-b': 0.9 }
    let config = { 'max': [ { 'mean': ['plugin-b', 'plugin-a'] }, 'plugin-a' ] }
    let abstractSyntaxTree = AggregatorConfigParser.parse(config)

    buster.assert.near(abstractSyntaxTree.eval(scores), 0.7, 1e-3)
  },

  'should be able to use array and number arguments': function () {
    let scores = { 'plugin-a': 0.5, 'plugin-b': 0.9 }
    let config = { 'weighted-mean': [[ 0.1, 'plugin-a' ], [ 0.9, 'plugin-b' ]] }
    let abstractSyntaxTree = AggregatorConfigParser.parse(config)

    buster.assert.near(abstractSyntaxTree.eval(scores), 0.86, 1e-3)
  },

  'should pass a single plugin as argument to an aggregator': function () {
    let scores = { 'plugin-a': 0.5, 'plugin-b': 0.9 }
    let config = { 'not': 'plugin-b' }
    let abstractSyntaxTree = AggregatorConfigParser.parse(config)

    buster.assert.near(abstractSyntaxTree.eval(scores), 0.1, 1e-3)
  },

  'should take * (star) argument to mean array of all plugins': function () {
    let scores = { 'plugin-a': 0.5, 'plugin-b': 0.9 }
    let config = { 'mean': '*' }
    let abstractSyntaxTree = AggregatorConfigParser.parse(config)

    buster.assert.near(abstractSyntaxTree.eval(scores), 0.7, 1e-3)
  },

  'should throw an InvalidInputError when aggregator does not exist': function () {
    let scores = { 'plugin-a': 0.5, 'plugin-b': 0.9 }
    let config = { 'blubb-aggregator': '*' }
    buster.assert.exception(() => AggregatorConfigParser.parse(config, scores))
  }
})
