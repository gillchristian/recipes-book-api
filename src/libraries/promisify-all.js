const _ = require('lodash')
const Promise = require('bluebird')

module.exports = modules => {
  _.each(modules, module => {
    // eslint-disable-next-line global-require
    Promise.promisifyAll(require(module))
  })
}
