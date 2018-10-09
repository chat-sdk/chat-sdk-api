'use strict'

const router = require('express').Router({ mergeParams: true })

module.exports = handler => api => {
  router.post('/', (req, res) => {
    api.getUsers(req.params.root).subscribe(handler(req, res))
  })

  router.post('/:uid', (req, res) => {
    api.getUser(req.params.root, req.params.uid).subscribe(handler(req, res))
  })

  router.post('/:uid/meta', (req, res) => {
    api.getUserMeta(req.params.root, req.params.uid).subscribe(handler(req, res))
  })

  router.post('/:uid/meta/:index', (req, res) => {
    api.getUserMetaValue(req.params.root, req.params.uid, req.params.index).subscribe(handler(req, res))
  })

  router.post('/:uid/threads', (req, res) => {
    api.getUserThreads(req.params.root, req.params.uid).subscribe(handler(req, res))
  })

  return router
}
