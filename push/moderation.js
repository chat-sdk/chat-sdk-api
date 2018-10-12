'use strict'

const router = require('express').Router({ mergeParams: true })
const getHandler = require('../routes/get-handler')

module.exports = pushHandler => api => {
  router.post('/', (req, res) => {
    const observable = api.getFlaggedMessages(req.params.root)
    observable.first().subscribe(getHandler(res))
    observable.subscribe(pushHandler(req))
  })

  router.post('/:mid', (req, res) => {
    const observable = api.getFlaggedMessage(req.params.root, req.params.mid)
    observable.first().subscribe(getHandler(res))
    observable.subscribe(pushHandler(req))
  })

  return router
}
