const buster = require('buster')
const scoreManager = require('../lib/score-manager')
const aggregatorConfigParser = require('../lib/aggregator-config-parser')
const pipeParser = require('../lib/parse-input-pipes')

const similarTextPlugin = require('../lib/plugins/similar-text-plugin')

buster.testCase('ScoreManager with configuration', {
  setUp: function () {
    // Aggregator stub
    this.cpEval = this.stub()
    this.cpParse = this.stub(aggregatorConfigParser, 'parse')
    this.cpParse.returns({ eval: this.cpEval })
  },

  'array input': {
    'should pass array to plugin if input path is not an array but points to one': function () {
      this.plugin = this.stub()
      const config = {
        aggregator: 'not used',
        plugins: { 'plugin': { use: this.plugin, inputs: ['a.b', 'x[].y'] } }
      }
      this.manager = scoreManager.create(config)
      this.plugin.returns(0.0)

      const blob = {
        a: { b: ['b1', 'b2', 'b3'] },
        x: [{ y: 'y1' }, { y: 'y2' }]
      }
      this.manager.scoreWith('plugin', blob)
      buster.assert.calledWith(this.plugin, ['b1', 'b2', 'b3'], 'y1')
      buster.assert.calledWith(this.plugin, ['b1', 'b2', 'b3'], 'y2')
    }
  },

  'scoreWith': {
    setUp: function () {
      this.stubPlugin = this.stub()
      let config = {
        aggregator: 'not used',
        plugins: {
          'plugin-a': {
            use: this.stubPlugin,
            inputs: ['x.y.z', 'a.b[].c']
          }
        }
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
      }, 'InvalidInputError')
    }
  },

  'construction failures': {
    setUp: function () {
      this.stubPlugin = { use: this.stub(), inputs: ['', ''] }
      this.config = { aggregator: 'not used' }
    },

    'should throw error when config was not used': function () {
      buster.assert.exception(() => scoreManager.create(undefined))
    },

    'should throw error when config has no plugins': function () {
      // Valid aggregator but no plugins.
      buster.assert.exception(() => scoreManager.create(this.config))
    },

    'should throw error when config has no aggregator': function () {
      // Valid plugin configuration but no aggregator.
      const config = { plugins: { 'plugin-a': this.stubPlugin } }
      buster.assert.exception(() => scoreManager.create(config))
    },

    'should throw error when plugin was defined without score function': function () {
      this.config.plugins = { 'plugin-a': { inputs: ['', ''] } }
      buster.assert.exception(() => scoreManager.create(this.config))
    },

    'should throw error when plugin was defined without inputs field and inputGroup field': function () {
      this.config.plugins = { 'plugin-a': { use: this.stub() } }
      buster.assert.exception(() => scoreManager.create(this.config))
    },

    'should throw error when plugin inputs field is not an array': function () {
      this.config.plugins = { 'plugin-a': { use: this.stub(), inputs: 'not an array' } }
      buster.assert.exception(() => scoreManager.create(this.config))
    },

    'should throw error when plugin was defined with invalid inputGroup field': function () {
      this.config.plugins = { 'plugin-a': { use: this.stub(), inputGroup: 'not an array' } }

      buster.assert.exception(() => scoreManager.create(this.config))
    },

    'should throw error when plugin was defined with inputGroup field but with invalid content': function () {
      this.config.plugins = { 'plugin-a': { use: this.stub(), inputGroup: ['invalid content'] } }

      buster.assert.exception(() => scoreManager.create(this.config))
    },

    'should throw error when plugin was defined with inputGroup field but with valid and invalid content': function () {
      this.config.plugins = { 'plugin-a': { use: this.stub(), inputGroup: [['valid'], 'invalid content'] } }

      buster.assert.exception(() => scoreManager.create(this.config))
    },

    'should throw error when plugin has no valid use-string': function () {
      this.config.plugins = { 'plugin-a': { use: 'nonexistent-plugin', inputs: ['a', 'b'] } }

      let manager = scoreManager.create(this.config)
      buster.assert.exception(() => manager.score({}), 'InvalidInputError')
    }
  },

  'ids in mapping objects': {
    setUp: function () {
      this.config = {
        aggregator: 'not used',
        plugins: {}
      }
    },
    'idPath exists with a valid field': function () {
      this.config.idPath = 'a.b.c[].d.e'
      buster.refute.exception(() => scoreManager.create(this.config))
    },
    'idPath exists but is not a string -> throw error': function () {
      this.config.idPath = 123
      buster.assert.exception(() => scoreManager.create(this.config))
    },
    'idPath exists but does not contain an': function () {
      this.config.idPath = 'a.b.c'
      buster.assert.exception(() => scoreManager.create(this.config))
    },
    'idPath exists in the configuration but ends with []': function () {
      this.config.idPath = 'a[]'
      buster.assert.exception(() => scoreManager.create(this.config))
    },
    'idPath exists but no valid array name': function () {
      this.config.idPath = '[].c'
      buster.assert.exception(() => scoreManager.create(this.config))
    },
    'idPath exists correct but has more arrays inside': function () {
      this.config.idPath = 'a.b[].c.d[].e'
      buster.assert.exception(() => scoreManager.create(this.config))
    },
    'iPath does not exist, no error should be given': function () {
      buster.refute.exception(() => scoreManager.create(this.config))
    }
  },
  'id creation': {
    setUp: function () {
      this.stubPluginA = this.stub()
      this.stubPluginA.returns(0.5)
      this.cpEval.returns(0.5)
      this.config = {
        aggregator: 'aggregator configuration',
        plugins: {
          'plugin-a': {
            use: this.stubPluginA,
            inputs: ['x', 'y[]']
          }
        }
      }
    },
    'return an id if configured correct and id is given': function () {
      this.config.idPath = 'y[].id'
      let blob = {
        x: 'something',
        y: [
          { 'id': '123' },
          { 'id': '321' },
          { 'id': 'abc' }
        ]
      }

      var manager = scoreManager.create(this.config)
      let score = manager.score(blob)
      let matcher = [ { id: '123' }, { id: '321' }, { id: 'abc' } ]
      buster.assert.match(score, matcher)
    },
    'appends ids to the mapping objects if they dont exist': function () {
      this.config.idPath = 'y[].a.id'
      let blob = {
        x: 'something',
        y: [
          { },
          { a: { } },
          { a: { 'id': 'abc' } }
        ]
      }

      var manager = scoreManager.create(this.config)
      let score = manager.score(blob)
      buster.refute.equals(score[0].id, undefined)
      buster.refute.equals(score[1].id, undefined)
      buster.assert.match(score[2], { id: 'abc' })
      buster.refute.equals(blob.y[0].a.id, undefined)
      buster.refute.equals(blob.y[1].a.id, undefined)
      buster.refute.equals(blob.y[2].a.id, undefined)
    }
  },
  'score using Aggregator': {
    setUp: function () {
      this.stubPluginA = this.stub()
      this.stubPluginB = this.stub()
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

      buster.assert.calledWith(this.cpParse, 'aggregator configuration')
      buster.assert.calledWith(this.cpEval, { 'plugin-a': 0.5, 'plugin-b': 0.8 })
    },

    'should return the scores returned by the aggregator in field total': function () {
      this.stubPluginA.returns(0.5)
      this.stubPluginB.returns(0.8)
      this.cpEval.returns(0.1)

      let scores = this.manager.score({ x: {}, y: [0] })

      buster.assert.equals(scores, [{ 'total': 0.1, 'plugin-a': 0.5, 'plugin-b': 0.8 }])
    }
  },

  'plugin failures': {
    setUp: function () {
      this.aggregatorSpec = 'not null but not used'
      this.config = {
        aggregator: 'not null but not used',
        plugins: {}
      }
    },

    'should be caught and returned as a special value': function () {
      let plugA = () => 1.0
      let plugB = () => { throw new Error() }

      this.config.plugins = {
        'plugin-a': { use: plugA, inputs: ['file', 'tasks[]'] },
        'plugin-b': { use: plugB, inputs: ['file', 'tasks[]'] }
      }

      let manager = scoreManager.create(this.config)

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

      this.config.plugins = {
        'plugin-a': { use: plugA, inputs: ['file', 'tasks[]'] },
        'plugin-c': { use: plugB, inputs: ['file', 'tasks[]'] }
      }
      let manager = scoreManager.create(this.config)

      let blob = {
        file: {},
        tasks: [{}]
      }

      let result = manager.score(blob)

      buster.assert.match(result[0]['plugin-c'], /this is the error description/)
    },

    'should be caught and isolated on a per plugin basis': function () {
      let plugA = () => 1.0
      let plugB = () => 1.0

      this.config.plugins = {
        'plugin-a': { use: plugA, inputs: ['no-attribute-here', 'tasks[]'] },
        'plugin-b': { use: plugB, inputs: ['file', 'tasks[]'] }
      }
      let manager = scoreManager.create(this.config)

      let blob = {
        file: {},
        tasks: [{}]
      }

      let result = manager.score(blob)
      buster.assert.match(result[0]['plugin-a'], /no-attribute-here/)
    },

    'should be caught and isolated on a per task basis': function () {
      let plugA = () => 1.0

      this.config.plugins = {
        'plugin-a': { use: plugA, inputs: ['file', 'tasks[].description'] }
      }
      let manager = scoreManager.create(this.config)

      let blob = {
        file: {},
        tasks: [{ description: 'this is a task' }, { x: 'no description here' }]
      }

      let result = manager.score(blob)
      buster.assert.same(result[0]['plugin-a'], 1.0)
      buster.assert.match(result[1]['plugin-a'], /failure/)
    },

    'should only pass successful scores to the aggregator': function () {
      let plugA = () => 1.0
      let plugB = () => { throw new Error('this is the error description') }

      this.config.plugins = {
        'plugin-a': { use: plugA, inputs: ['file', 'tasks[]'] },
        'plugin-b': { use: plugB, inputs: ['file', 'tasks[]'] }
      }
      let manager = scoreManager.create(this.config)

      let blob = {
        file: {},
        tasks: [{}]
      }

      manager.score(blob)

      buster.assert.calledWith(this.cpEval, {'plugin-a': 1.0})
    }
  }
})

buster.testCase('ScoreManager Integration', {
  'should dynamically assign aggregator function from string': function () {
    const stubPluginA = this.stub()
    const stubPluginB = this.stub()
    const config = {
      aggregator: {'max': ['plugin-a', 'plugin-b']},
      plugins: {
        'plugin-a': {
          use: stubPluginA,
          inputs: ['x', 'y[]']
        },
        'plugin-b': {
          use: stubPluginB,
          inputs: ['x', 'y[]']
        }
      }
    }
    stubPluginA.returns(0.5)
    stubPluginB.returns(0.8)

    let manager = scoreManager.create(config)

    let scores = manager.score({ x: {}, y: [0] })
    buster.assert.equals(scores, [{ 'total': 0.8, 'plugin-a': 0.5, 'plugin-b': 0.8 }])
  },

  'should be able to use similarTextPlugin': function () {
    let config = {
      aggregator: {'max': ['similar-text']},
      plugins: {
        'similar-text': {
          use: similarTextPlugin,
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

  'should report total as failure when all plugins threw erros': function () {
    let config = {
      aggregator: {'max': ['similar-text']},
      plugins: {
        'similar-text': {
          use: similarTextPlugin,
          inputs: ['file.title', 'tasks[].title']
        }
      }
    }
    let manager = scoreManager.create(config)

    let blob = {
      file: { title: 'location' },
      tasks: [
        { title: NaN },
        { title: '12345' }
      ]
    }

    let result = manager.score(blob)
    buster.assert.match(result[0].total, /failed/)
  },

  'dynamic plugin loading': {
    'should load plugin given by string from plugin directory': function () {
      let config = {
        aggregator: {'max': ['similar-text']},
        plugins: {
          'similar-text': {
            use: 'similar-text-plugin',
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

  'plugins with more than 2 arguments': {
    'should receive arguments given in inputs array': function () {
      let config = {
        aggregator: {'max': '*'},
        plugins: {
          'in-time': {
            use: 'in-timespan-plugin',
            inputs: ['file.created_at', 'tasks[].created_at', 'tasks[].due_date']
          }
        }
      }
      let manager = scoreManager.create(config)

      let blob = {
        file: { created_at: 1481924134 },
        tasks: [
          { created_at: 1481924000, due_date: 1481924500 }, // yes case
          { created_at: 1481920000, due_date: 1481924000 }  // no case
        ]
      }

      let result = manager.score(blob)
      buster.assert.near(result[0]['in-time'], 1.0, 1e-3)
      buster.assert.near(result[1]['in-time'], 0.0, 1e-3)
    },

    'should return a length 1 array result when no array[] path is given': function () {
      let config = {
        aggregator: {'max': '*'},
        plugins: {
          'in-time': {
            use: 'in-timespan-plugin',
            inputs: ['file.created_at', 'file.other_date', 'file.due_date']
          }
        }
      }
      let manager = scoreManager.create(config)

      let blob = {
        file: { created_at: 1481924134, other_date: 1481924000, due_date: 1481924500 }
      }

      let result = manager.score(blob)
      buster.assert.equals(result.length, 1)
      buster.assert.near(result[0]['in-time'], 1.0, 1e-3)
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
  },

  'plugin pipes': {
    'should apply the pipe': function () {
      let piper = this.stub(pipeParser, 'applyPipe')
      let config = {
        aggregator: 'plugin-a',
        plugins: {
          'plugin-a': {
            use: this.stub(),
            inputs: ['x | to-upper-case', 'y[]']
          }
        }
      }
      let manager = scoreManager.create(config)
      let blob = {
        x: { xkey: 'xvalue' },
        y: [{ ykey: 'yvalue' }]
      }
      manager.score(blob)
      buster.assert.equals(piper.callCount, 1)
    }
  }

})
