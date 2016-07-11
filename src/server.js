const mongoose = require('mongoose')
const config = require('./config/config')

const app = require('./app')(mongoose)
const port = config.PORT

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`🌎 Listening on port ${port}. Open up http://localhost:${port}.`)
})
