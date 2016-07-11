const config = require('../config/config')
const jwt = require('jsonwebtoken')

function validate(req) {
  const url = req.url.replace('/api/', '')
  const isGet = req.method === 'GET'
  const isNotPublic = !(url.indexOf('cms') !== -1)
  const isNotUsers = !(url.indexOf('users') !== -1)
  return isGet && isNotPublic && isNotUsers
}

module.exports = function middleware(req, res, next) {
  const token = req.body.token || req.query.token || req.headers.authorization
  if (validate(req)) { return next() }
  if (!token) { return res.status(401).send('No token provided.') }
  return jwt.verify(token, config.SECRET, (err, decoded) => {
    if (err) { return res.status(401).send('Failed to authenticate token.') }
    req.decoded = decoded // eslint-disable-line no-param-reassign
    return next()
  })
}
