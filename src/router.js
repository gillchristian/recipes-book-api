const recipeRoute = require('./routes/recipe-route')
const userRoute = require('./routes/user-route')
const mainRoute = require('./routes/main-route')
const config = require('./config/config')
const authRoute = require('./routes/auth-route')
const authMiddleware = require('./middlewares/auth-middleware')

module.exports = (req, res, next) => {
  // eslint-disable-next-line global-require
  require('./libraries/promisify-all')(['mongoose'])

  req.app.use('/', mainRoute)
  req.app.use('/api/authenticate', authRoute)

  if (!config.DISABLE_AUTH) {
    req.app.use(authMiddleware)
  }
  req.app.use('/api/recipes', recipeRoute)
  req.app.use('/api/users', userRoute)
  next()
}
