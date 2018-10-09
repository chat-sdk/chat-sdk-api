'use strict'

const router = require('express').Router({ mergeParams: true })

module.exports = handler => api => {
  router.post('/', (req, res) => {
    api.getThreads(req.params.root).subscribe(handler(req, res))
  })

  router.post('/:tid', (req, res) => {
    api.getThread(req.params.root, req.params.tid).subscribe(handler(req, res))
  })

  router.post('/:tid/meta', (req, res) => {
    api.getThreadMeta(req.params.root, req.params.tid).subscribe(handler(req, res))
  })

  router.post('/:tid/meta/:index', (req, res) => {
    api.getThreadMetaValue(req.params.root, req.params.tid, req.params.index).subscribe(handler(req, res))
  })

  router.post('/:tid/messages', (req, res) => {
    api.getThreadMessages(req.params.root, req.params.tid).subscribe(handler(req, res))
  })

  router.post('/:tid/messages/:mid', (req, res) => {
    api.getThreadMessage(req.params.root, req.params.tid, req.params.mid).subscribe(handler(req, res))
  })

  router.post('/:tid/users', (req, res) => {
    api.getThreadUsers(req.params.root, req.params.tid).subscribe(handler(req, res))
  })

  router.post('/:tid/users/:uid', (req, res) => {
    api.getThreadUser(req.params.root, req.params.tid, req.params.uid).subscribe(handler(req, res))
  })

  return router
}
