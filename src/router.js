const recipeRoute = require('./routes/recipe-route');
const userRoute = require('./routes/user-route');
const mainRoute = require('./routes/main-route');
const cmsRoute = require('./routes/cms-route');
const config = require('./config/config');
const authRoute = require('./routes/auth-route');
const authMiddleware = require('./middlewares/auth-middleware');
const express = require('express'); // eslint-disable-line new-cap
const path = require('path');

module.exports = (req, res, next) => {
  const relative = process.env.NODE_ENV === 'prod' ?
    './public/bundle.prod.js' :
    './public/bundle.dev.js';
  res.app.use('/app.js', express.static(path.join(__dirname, relative)));

  req.app.use('/', mainRoute);
  req.app.use('/api/authenticate', authRoute);
  req.app.use('/cms', cmsRoute);
  if (!config.DISABLE_AUTH) {
    req.app.use(authMiddleware);
  }
  req.app.use('/api/recipes', recipeRoute);
  req.app.use('/api/users', userRoute);
  next();
};
