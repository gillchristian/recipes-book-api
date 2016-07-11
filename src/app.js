const config = require('./config/config')
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const routes = require('./router')
const middlewares = require('./middlewares')

const app = express()

function server(mongoose) {
  // eslint-disable-next-line no-param-reassign
  mongoose.Promise = global.Promise
  mongoose.connect(config.MONGODB_URI)
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())
  app.use(morgan('tiny'))

  app.use(middlewares.cors)

  app.use('/', routes)

  return app
}

module.exports = server
