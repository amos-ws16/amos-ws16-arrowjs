const buster = require('buster')
const handleStar = require('../lib/handle-star').handleStar
const scoreSource = require('../lib/aggregators/score-source')

buster.testCase('normalizeStarAggregator', {
  'should return list of aggregators if that list was passed in': function () {
    const ag1 = { eval: this.stub() }
    const ag2 = { eval: this.stub() }
    const scores = {}
    const result = handleStar([ ag1, ag2 ], scores)
    buster.assert.equals(result, [ ag1, ag2 ])
  },

  'should return list of one score sources that points to the passed score plugin if star was passed': function () {
    const result = handleStar('*', { 'plugin-a': 0.1 })
    buster.assert.equals(result, [ scoreSource.create('plugin-a') ])
  },

  'should return list of score sources, one for each score in passed scores when star was passed': function () {
    const result = handleStar('*', { 'plugin-a': 0.1, 'plugin-b': 0.2 })
    buster.assert.equals(result, [ scoreSource.create('plugin-a'), scoreSource.create('plugin-b') ])
  },

  '// should start to think': function () {
    // parser sees '*' -> '*'
    // inside eval(scores)
    //   agList = handleStar(agList, score)
    //   handleStar(agList, scores):
    //     if (agList == *) Object.keys(sources).map((key) => new ScoreSource(key))
    //     else agList
  }

})
