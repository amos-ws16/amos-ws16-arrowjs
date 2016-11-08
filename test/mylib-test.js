const buster = require('buster')
const myLib = require('../lib/mylib')

buster.testCase('A module', {
  'states the obvious': () => {
    buster.assert(myLib.wisdom)
  }
})

