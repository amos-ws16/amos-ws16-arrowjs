const buster = require('buster')
const postApiScore = require('../lib/server/post-api-score')
const scoreManager = require('../lib/score-manager')
const config = require('../config')

buster.testCase('postApiScore', {
  'should use scoreManager\'s create function': function () {
    let fakeScoreManager = { score: this.stub() }
    let create = this.stub(scoreManager, 'create').returns(fakeScoreManager)

    let req = { body: {} }
    let res = { send: this.stub(), json: this.stub() }
    postApiScore(req, res)
    buster.assert.called(create)
  },

  'should pass default config when request has no config': function () {
    let fakeScoreManager = { score: this.stub() }
    let create = this.stub(scoreManager, 'create').returns(fakeScoreManager)

    let req = { body: {} }
    let res = { send: this.stub(), json: this.stub() }
    postApiScore(req, res)
    buster.assert.calledWith(create, config.scoreManager)
  },

  'should pass request config when available': function () {
    let fakeScoreManager = { score: this.stub() }
    let create = this.stub(scoreManager, 'create').returns(fakeScoreManager)

    let req = { body: { config: {} } }
    let res = { send: this.stub(), json: this.stub() }
    postApiScore(req, res)
    buster.assert.calledWith(create, {})
  }
})
