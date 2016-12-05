const buster = require('buster')
const VError = require('verror').VError
const postApiScore = require('../../lib/server/post-api-score')
const scoreManager = require('../../lib/score-manager')
const config = require('../../config')
const InvalidInputError = require('../../lib/invalid-input-error')

buster.testCase('postApiScore', {
  setUp: function () {
    this.fakeScoreManager = { score: this.stub() }
    this.create = this.stub(scoreManager, 'create').returns(this.fakeScoreManager)

    this.req = { body: {} }
    this.res = { send: this.stub(), json: this.stub() }
  },

  'should use scoreManager\'s create function': function () {
    postApiScore(this.req, this.res)
    buster.assert.called(this.create)
  },

  'should pass default config when request has no config': function () {
    postApiScore(this.req, this.res)
    buster.assert.calledWith(this.create, config.scoreManager)
  },

  'should pass request config when available': function () {
    this.req.body.config = {}
    postApiScore(this.req, this.res)
    buster.assert.calledWith(this.create, {})
  },

  'should wrap result in object with success flag set to true': function () {
    this.fakeScoreManager.score.returns('my result')
    postApiScore(this.req, this.res)
    buster.assert.calledWith(this.res.json, { success: true, result: 'my result' })
  },

  'should pass along error message on input error': function () {
    this.fakeScoreManager.score.throws(new InvalidInputError('There was a problem'))
    postApiScore(this.req, this.res)
    buster.assert.calledWith(this.res.json, { success: false, error: 'There was a problem' })
  },

  'should pass along error message on wrapped input error': function () {
    this.fakeScoreManager.score.throws(
      new VError(
        new InvalidInputError('There was a specific problem'),
        'There was a general problem'))
    postApiScore(this.req, this.res)
    buster.assert.calledWith(this.res.json, { success: false, error: 'There was a general problem: There was a specific problem' })
  },

  'should signal an internal server error on error conditions other than input and rethrow exception': function () {
    this.fakeScoreManager.score.throws(new Error('There was an internal problem'))
    buster.assert.exception(() => postApiScore(this.req, this.res))
    buster.assert.calledWith(this.res.json, { success: false, error: 'Internal Server Error' })
  }
})
