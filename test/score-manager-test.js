const buster = require('buster')
const scoreManager = require('../lib/score-manager')
// const aggregator = require('../lib/score-aggregator')
const aggregatorConfigParser = require('../lib/aggregator-config-parser')

const similarContextPlugin = require('../lib/plugins/similar-context-plugin')

buster.testCase('ScoreManager with configuration', {
  'scoreWith': {
    setUp: function () {
      this.stubPlugin = this.stub()
      let config = {
        plugins: {
          'plugin-a': {
            use: this.stubPlugin,
            inputs: ['x.y.z', 'a.b[].c']
          }
        },
        // Not used.
        aggregator: { combine: this.stub() }
      }
      this.manager = scoreManager.create(config)
    },

    'should call plugin with inputs defined by path': function () {
      let blob = {
        x: { y: { z: 'foo' } },
        a: { b: [
          { c: 'bar' },
          { c: 'baz' }
        ] }
      }

      this.manager.scoreWith('plugin-a', blob)

      buster.assert.calledWith(this.stubPlugin, 'foo', 'bar')
      buster.assert.calledWith(this.stubPlugin, 'foo', 'baz')
    },

    'should call plugin with inputs defined by path 2': function () {
      let blob = {
        x: { y: { z: 'hello' } },
        a: { b: [
          { c: 'world' },
          { c: 'goodbye' }
        ] }
      }

      this.manager.scoreWith('plugin-a', blob)

      buster.assert.calledWith(this.stubPlugin, 'hello', 'world')
      buster.assert.calledWith(this.stubPlugin, 'hello', 'goodbye')
    },

    'should return what the plugin returned': function () {
      this.stubPlugin.onCall(0).returns(0.123)
      this.stubPlugin.onCall(1).returns(0.456)
      let blob = {
        x: { y: { z: 'foo' } },
        a: { b: [
          { c: 'bar' },
          { c: 'baz' }
        ] }
      }

      let result = this.manager.scoreWith('plugin-a', blob)

      buster.assert.equals(result, [0.123, 0.456])
    },

    'should throw error when plugin does not exist': function () {
      buster.assert.exception(() => {
        this.manager.scoreWith('nonexistent-plugin', {})
      })
    },

    'should rethrow a wrapped error when extractObject throws': function () {
      buster.assert.exception(() => this.manager.scoreWith('plugin-a', {}))
    }
  },

  'construction failures': {
    setUp: function () {
      this.stubAggregator = { combine: this.stub() }
      this.stubPlugin = { use: this.stub(), inputs: ['', ''] }
    },

    'should throw error when config was not used': function () {
      buster.assert.exception(() => scoreManager.create(undefined))
    },

    'should throw error when config has no plugins': function () {
      // Valid aggregator but no plugins.
      let config = { aggregator: this.stubAggregator }
      buster.assert.exception(() => scoreManager.create(config))
    },

    'should throw error when config has no aggregator': function () {
      // Valid plugin configuration but no aggregator.
      let config = { plugins: { 'plugin-a': this.stubPlugin } }
      buster.assert.exception(() => scoreManager.create(config))
    },

    'should throw error when plugin was defined without score function': function () {
      let config = {
        plugins: { 'plugin-a': { inputs: ['', ''] } },
        aggregator: this.stubAggregator
      }
      buster.assert.exception(() => scoreManager.create(config))
    },

    'should throw error when plugin was defined without inputs field': function () {
      let config = {
        plugins: { 'plugin-a': { use: this.stub() } },
        aggregator: this.stubAggregator
      }
      buster.assert.exception(() => scoreManager.create(config))
    },

    'should throw error when plugin inputs field is not an array of length 2': function () {
      let config = {
        plugins: { 'plugin-a': { use: this.stub(), inputs: 'not an array' } },
        aggregator: this.stubAggregator
      }
      buster.assert.exception(() => scoreManager.create(config))
    }
  },

  'score using Aggregator': {
    setUp: function () {
      this.stubPluginA = this.stub()
      this.stubPluginB = this.stub()
      this.stubEval = this.stub()
      this.stubParse = this.stub(aggregatorConfigParser, 'parse').returns({ eval: this.stubEval })
      let config = {
        aggregator: 'aggregator configuration',
        plugins: {
          'plugin-a': {
            use: this.stubPluginA,
            inputs: ['x', 'y[]']
          },
          'plugin-b': {
            use: this.stubPluginB,
            inputs: ['x', 'y[]']
          }
        }
      }
      this.manager = scoreManager.create(config)
    },

    'should use the config provided aggregator': function () {
      this.stubPluginA.returns(0.5)
      this.stubPluginB.returns(0.8)

      this.manager.score({ x: {}, y: [0] })

      buster.assert.calledWith(this.stubParse,
        'aggregator configuration', { 'plugin-a': 0.5, 'plugin-b': 0.8 })
    },

    'should return the scores returned by the aggregator in field total': function () {
      this.stubPluginA.returns(0.5)
      this.stubPluginB.returns(0.8)
      this.stubEval.returns(0.1)

      let scores = this.manager.score({ x: {}, y: [0] })

      buster.assert.equals(scores, [{ 'total': 0.1, 'plugin-a': 0.5, 'plugin-b': 0.8 }])
    }
  },

  'score using string aggregator': {
    setUp: function () {
      this.stubPluginA = this.stub()
      this.stubPluginB = this.stub()
      this.config = {
        plugins: {
          'plugin-a': {
            use: this.stubPluginA,
            inputs: ['x', 'y[]']
          },
          'plugin-b': {
            use: this.stubPluginB,
            inputs: ['x', 'y[]']
          }
        }
      }
    },

    'should dynamically assign aggregator function from string': function () {
      this.stubPluginA.returns(0.5)
      this.stubPluginB.returns(0.8)
      this.config.aggregator = {'max': ['plugin-a', 'plugin-b']}
      let manager = scoreManager.create(this.config)

      let scores = manager.score({ x: {}, y: [0] })
      buster.assert.equals(scores, [{ 'total': 0.8, 'plugin-a': 0.5, 'plugin-b': 0.8 }])
    },

    '// should throw an error if no aggregator by that name exists': function () {
      // TODO: parse config on creation, not at evaluation time
      this.stubPluginA.returns(0.5)
      this.stubPluginB.returns(0.8)
      this.config.aggregator = 'no-aggregator-here'
      buster.assert.exception(() => scoreManager.create(this.config))
    }
  },

  'plugin failures': {
    setUp: function () {
      this.stubParse = this.stub(aggregatorConfigParser, 'parse')
      this.stubParse.returns({ eval: this.stub() })
      this.aggregatorSpec = 'not null but not used'
    },

    'should be caught and returned as a special value': function () {
      let plugA = () => 1.0
      let plugB = () => { throw new Error() }

      let manager = scoreManager.create({
        aggregator: this.aggregatorSpec,
        plugins: {
          'plugin-a': { use: plugA, inputs: ['file', 'tasks[]'] },
          'plugin-b': { use: plugB, inputs: ['file', 'tasks[]'] }
        }
      })

      let blob = {
        file: {},
        tasks: [{}]
      }

      let result = manager.score(blob)

      buster.assert.match(result[0]['plugin-b'], /failure/)
    },

    'should be caught and returned as error message with description': function () {
      let plugA = () => 1.0
      let plugB = () => { throw new Error('this is the error description') }

      let manager = scoreManager.create({
        aggregator: this.aggregatorSpec,
        plugins: {
          'plugin-a': { use: plugA, inputs: ['file', 'tasks[]'] },
          'plugin-c': { use: plugB, inputs: ['file', 'tasks[]'] }
        }
      })

      let blob = {
        file: {},
        tasks: [{}]
      }

      let result = manager.score(blob)

      buster.assert.match(result[0]['plugin-c'], /this is the error description/)
    },

    'should only pass successful scores to the aggregator': function () {
      let plugA = () => 1.0
      let plugB = () => { throw new Error('this is the error description') }

      let manager = scoreManager.create({
        aggregator: this.aggregatorSpec,
        plugins: {
          'plugin-a': { use: plugA, inputs: ['file', 'tasks[]'] },
          'plugin-b': { use: plugB, inputs: ['file', 'tasks[]'] }
        }
      })

      let blob = {
        file: {},
        tasks: [{}]
      }

      manager.score(blob)

      buster.assert.calledWith(this.stubParse, this.aggregatorSpec, {'plugin-a': 1.0})
    }
  }
})

buster.testCase('ScoreManager Plugin Integration', {
  setUp: function () {
    // this.stubAstEval = this.stub()
    // this.stub(aggregatorConfigParser, 'parse').returns({ eval: this.stubAstEval })
  },

  'should be able to use similarContextPlugin': function () {
    let config = {
      aggregator: {'max': ['similar-context']},
      plugins: {
        'similar-context': {
          use: similarContextPlugin,
          inputs: ['file.title', 'tasks[].title']
        }
      }
    }
    let manager = scoreManager.create(config)

    let blob = {
      file: { title: 'location' },
      tasks: [
        { title: 'location' },
        { title: '12345' }
      ]
    }

    let result = manager.score(blob)
    buster.assert.near(result[0].total, 1.0, 1e-3)
    buster.assert.near(result[1].total, 0.0, 1e-3)
  },

  'dynamic plugin loading': {
    'should load plugin given by string from plugin directory': function () {
      let config = {
        aggregator: {'max': ['similar-context']},
        plugins: {
          'similar-context': {
            use: 'similar-context-plugin',
            inputs: ['file.title', 'tasks[].title']
          }
        }
      }
      let manager = scoreManager.create(config)

      let blob = {
        file: { title: 'location' },
        tasks: [
          { title: 'location' },
          { title: '12345' }
        ]
      }

      let result = manager.score(blob)
      buster.assert.near(result[0].total, 1.0, 1e-3)
      buster.assert.near(result[1].total, 0.0, 1e-3)
    }
  },

  'plugin parameters': {
    'should be passed as third argument': function () {
      let pluginA = this.stub().returns(0.0)
      let config = {
        aggregator: 'plugin-a',
        plugins: {
          'plugin-a': {
            use: pluginA,
            inputs: ['x', 'y[]'],
            params: { 'my-special-arg': 100 }
          }
        }
      }
      let manager = scoreManager.create(config)
      let blob = {
        x: { xkey: 'xvalue' },
        y: [{ ykey: 'yvalue' }]
      }
      manager.score(blob)
      buster.assert.calledWith(pluginA, { xkey: 'xvalue' }, { ykey: 'yvalue' }, { 'my-special-arg': 100 })
    }
  }
})
