const buster = require('buster')
const AggregatorConfigParser = require('../lib/aggregator-config-parser')

buster.testCase('AggregatorConfigParser', {
  'should take a single plugin id and return the plugins score': function () {
    let scores = { 'plugin-a': 0.5 }
    let config = 'plugin-a'
    let abstractSyntaxTree = AggregatorConfigParser.parse(config, scores)

    buster.assert.near(abstractSyntaxTree.eval(), 0.5, 1e-3)
  },

  'should take a single plugin id and return the plugins score (2)': function () {
    let scores = { 'plugin-a': 0.9 }
    let config = 'plugin-a'
    let abstractSyntaxTree = AggregatorConfigParser.parse(config, scores)

    buster.assert.near(abstractSyntaxTree.eval(), 0.9, 1e-3)
  },

  'should take a single plugin id and return the plugins score (3)': function () {
    let scores = { 'plugin-b': 0.9 }
    let config = 'plugin-b'
    let abstractSyntaxTree = AggregatorConfigParser.parse(config, scores)

    buster.assert.near(abstractSyntaxTree.eval(), 0.9, 1e-3)
  },

  'should take two plugin ids and return the plugin\'s mean score': function () {
    let scores = { 'plugin-a': 0.5, 'plugin-b': 0.9 }
    let config = { 'mean': ['plugin-b', 'plugin-a'] }
    let abstractSyntaxTree = AggregatorConfigParser.parse(config, scores)

    buster.assert.near(abstractSyntaxTree.eval(), 0.7, 1e-3)
  },

  'should take two plugin ids and return the plugin\'s mean of mean scores': function () {
    let scores = { 'plugin-a': 0.5, 'plugin-b': 0.9 }
    let config = { 'mean': [ { 'mean': ['plugin-b', 'plugin-a'] }, 'plugin-a' ] }
    let abstractSyntaxTree = AggregatorConfigParser.parse(config, scores)

    buster.assert.near(abstractSyntaxTree.eval(), 0.6, 1e-3)
  },

  'should throw an error if plugin is not present': function () {
    let scores = {}
    let config = 'plugin-a'
    buster.assert.exception(() => AggregatorConfigParser.parse(config, scores))
  },

  'should throw an error if plugin is not present but other plugins are': function () {
    let scores = { 'plugin-a': 0.5, 'plugin-b': 0.9 }
    let config = 'plugin-c'
    buster.assert.exception(() => AggregatorConfigParser.parse(config, scores))
  },

  'should be able to use multiple aggregators': function () {
    let scores = { 'plugin-a': 0.5, 'plugin-b': 0.9 }
    let config = { 'max': [ { 'mean': ['plugin-b', 'plugin-a'] }, 'plugin-a' ] }
    let abstractSyntaxTree = AggregatorConfigParser.parse(config, scores)

    buster.assert.near(abstractSyntaxTree.eval(), 0.7, 1e-3)
  },

  'should be able to use array and number arguments': function () {
    let scores = { 'plugin-a': 0.5, 'plugin-b': 0.9 }
    let config = { 'weighted-mean': [[ 0.1, 'plugin-a' ], [ 0.9, 'plugin-b' ]] }
    let abstractSyntaxTree = AggregatorConfigParser.parse(config, scores)

    buster.assert.near(abstractSyntaxTree.eval(), 0.86, 1e-3)
  }
})
