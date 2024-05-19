const swaggerUi = require('swagger-ui-express')
// Function or setup ours docs
const swaggerDocs = (app) => {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(require('./swagger-documentation.json')))
  app.get('/api/docs.json', (req, res) => {
    res.setHeader('Content-type', 'application/json')
    res.send(require('./swagger-output.json'))
  })
}

module.exports = { swaggerDocs }
