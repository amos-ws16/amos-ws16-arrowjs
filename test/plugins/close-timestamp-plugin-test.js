const buster = require('buster')
const plugin = require('../../lib/plugins/close-timestamp-plugin.js')

const timedifferenceLimit = 600
const uploadTimestamp = 1478886423.003

buster.testCase('Input Scorer', {
  'should use time limit from param if set': function () {
    const taskTimestamp = uploadTimestamp - 1234 / 2
    let result = plugin(uploadTimestamp, taskTimestamp, { 'time-limit': 1234 })
    buster.assert.equals(result, 0.5)
  },
  'should return 1.0 when timing matches exactly': function () {
    let result = plugin(uploadTimestamp, uploadTimestamp)
    buster.assert.equals(result, 1.0)
  },

  'should return 0.0 if timstamps differ more than timedifferenceLimit': function () {
    const taskTimestamp = uploadTimestamp - timedifferenceLimit - 1
    let result = plugin(uploadTimestamp, taskTimestamp)
    buster.assert.equals(result, 0.0)
  },

  'should return 0.5 if timstamps differ 0.5*timedifferenceLimit (positive)': function () {
    const taskTimestamp = uploadTimestamp - timedifferenceLimit / 2
    let result = plugin(uploadTimestamp, taskTimestamp)
    buster.assert.equals(result, 0.5)
  },

  'should return 0.5 if timstamps differ 0.5*timedifferenceLimit (negative)': function () {
    const taskTimestamp = uploadTimestamp + timedifferenceLimit / 2
    let result = plugin(uploadTimestamp, taskTimestamp)
    buster.assert.equals(result, 0.5)
  },

  'should return 0.25 if timstamps differ 0.25*timedifferenceLimit (positive)': function () {
    const taskTimestamp = uploadTimestamp - 3 * timedifferenceLimit / 4
    let result = plugin(uploadTimestamp, taskTimestamp)
    buster.assert.equals(result, 0.25)
  },

  'should return 0.25 if timstamps differ 0.25*timedifferenceLimit (negative)': function () {
    const taskTimestamp = uploadTimestamp + 3 * timedifferenceLimit / 4
    let result = plugin(uploadTimestamp, taskTimestamp)
    buster.assert.equals(result, 0.25)
  }

})
