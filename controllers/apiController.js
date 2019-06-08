const { isEmpty } = require('lodash')
const { OK } = require('http-status')

const { process } = require('../services/calculator')

module.exports = {
  async show(ctx) {
    let nextStateObject

    try {
      nextStateObject = await process(ctx.request.body)
    } catch (e) {
      ctx.body = e.message
      return
    }

    if (nextStateObject && !isEmpty(nextStateObject)) {
      ctx.body = nextStateObject
      ctx.status = OK
    } else {
      ctx.body = {}
    }
  }
}
