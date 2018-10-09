'use strict'

const router = require('express').Router({ mergeParams: true })

module.exports = handler => api => {
  router.post('/', (req, res) => {
    api.getFlaggedMessages(req.params.root).subscribe(handler(req, res))
  })

  router.post('/:mid', (req, res) => {
    api.getFlaggedMessage(req.params.root, req.params.mid).subscribe(handler(req, res))
  })

  return router
}
