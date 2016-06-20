const Router = require('express').Router;
const router = new Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Recipes API!',
    endpoints: {
      recipes: 'api/recipes',
    },
    version: '1.0.0',
    lastUpdate: 'June 17 2016',
  });
});

module.exports = router;
