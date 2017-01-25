const buster = require('buster')
const parseInputGroups = require('../lib/parse-input-group').parseInputGroups
const combineArrays = require('../lib/parse-input-group').combineArrays

buster.testCase('parseInputGroups', {
  'should return the plugins as is, when there is no inputGroup': function () {
    let config = {
      aggregator: 'plugin-a',
      plugins: {
        'plugin-a': {
          use: this.stub(),
          inputs: ['x', 'y[]'],
          params: { 'my-special-arg': 100 }
        }
      }
    }

    let result = parseInputGroups(config)
    buster.assert.equals(result, config)
  },

  'should return the plugins with the generated plugins based on the inputGroup (2 inputs)': function () {
    let config = {
      aggregator: 'plugin-a',
      plugins: {
        'plugin-a': {
          use: this.stub(),
          inputGroup: [['x'], ['y[].a', 'y[].b']]
        }
      }
    }

    let result = parseInputGroups(config)

    buster.assert.isObject(result)
    buster.assert.defined(result.plugins['plugin-a-x-y.a'])
    buster.assert.defined(result.plugins['plugin-a-x-y.b'])
    buster.assert.equals(result.plugins['plugin-a-x-y.a'].inputs, ['x', 'y[].a'])
    buster.assert.equals(result.plugins['plugin-a-x-y.b'].inputs, ['x', 'y[].b'])
  },

  'should return the plugins with the generated plugins based on the inputGroup (3 inputs)': function () {
    let config = {
      aggregator: 'plugin-a',
      plugins: {
        'plugin-a': {
          use: this.stub(),
          inputGroup: [['x'], ['y[].a', 'y[].b'], ['y[].c', 'y[].d']]
        }
      }
    }

    let result = parseInputGroups(config)

    buster.assert.isObject(result)
    buster.assert.defined(result.plugins['plugin-a-x-y.a-y.c'])
    buster.assert.defined(result.plugins['plugin-a-x-y.a-y.d'])
    buster.assert.defined(result.plugins['plugin-a-x-y.b-y.c'])
    buster.assert.defined(result.plugins['plugin-a-x-y.b-y.d'])
  },

  'should return the plugins with the generated plugins based on the inputGroup (2 inputs) and params': function () {
    let config = {
      aggregator: 'plugin-a',
      plugins: {
        'plugin-a': {
          use: this.stub(),
          inputGroup: [['x'], ['y[].a', 'y[].b']],
          params: { 'my-special-arg': 100 }
        }
      }
    }

    let result = parseInputGroups(config)

    buster.assert.isObject(result)
    buster.assert.defined(result.plugins['plugin-a-x-y.a'])
    buster.assert.defined(result.plugins['plugin-a-x-y.b'])
    buster.assert.defined(result.plugins['plugin-a-x-y.a'].params)
    buster.assert.defined(result.plugins['plugin-a-x-y.b'].params)
  },

  'should return a combination of two arrays': function () {
    let arr1 = ['a', 'b']
    let arr2 = ['x', 'y']

    let result = combineArrays(arr1, arr2)

    buster.assert.isArray(result)
    buster.assert.equals(result, [[ 'a', 'x' ], [ 'a', 'y' ], [ 'b', 'x' ], [ 'b', 'y' ]])
  }
})
