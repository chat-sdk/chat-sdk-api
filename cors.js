'use strict'

const corser = require('corser')

module.exports = () => {
  return corser.create({
    methods: corser.simpleMethods.concat(['PUT', 'DELETE'])
  })
}
