const router = require('koa-router')()
const apiController = require('./controllers/apiController')

router.post('/api/calc', ctx => apiController.show(ctx))

module.exports = router