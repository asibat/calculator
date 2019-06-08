const Koa = require('koa')
const koaBody = require('koa-body')
const cors = require('@koa/cors')

const router = require('./routes')

const app = new Koa()

app.use(koaBody())
app.use(cors())

// A universal interceptor that prints the ctx each time a request is made on the server
if (process.env.NODE_ENV !== 'production') {
  app.use(async (ctx, next) => {
    console.log(ctx)
    await next()
  })
}

// Error handling
app.use(async function(ctx, next) {
  try {
    await next()
  } catch (err) {
    ctx.app.emit('error', err, ctx)
  }
})

// Load the router into the Koa app
app.use(router.routes())
app.use(router.allowedMethods())

// Start server
const port = 3060
module.exports = app.listen(port, function() {
  console.log('Server listening on', port)
})
