'use strict'

const router = require('express').Router({ mergeParams: true })
const getHandler = require('../routes/get-handler')

module.exports = pushHandler => api => {
  router.post('/', (req, res) => {
    const observable = api.getThreads(req.params.root)
    observable.first().subscribe(getHandler(res))
    observable.subscribe(pushHandler(req))
  })

  router.post('/:tid', (req, res) => {
    const observable = api.getThread(req.params.root, req.params.tid)
    observable.first().subscribe(getHandler(res))
    observable.subscribe(pushHandler(req))
  })

  router.post('/:tid/meta', (req, res) => {
    const observable = api.getThreadMeta(req.params.root, req.params.tid)
    observable.first().subscribe(getHandler(res))
    observable.subscribe(pushHandler(req))
  })

  router.post('/:tid/meta/:index', (req, res) => {
    const observable = api.getThreadMetaValue(req.params.root, req.params.tid, req.params.index)
    observable.first().subscribe(getHandler(res))
    observable.subscribe(pushHandler(req))
  })

  router.post('/:tid/messages', (req, res) => {
    const observable = api.getThreadMessages(req.params.root, req.params.tid)
    observable.first().subscribe(getHandler(res))
    observable.subscribe(pushHandler(req))
  })

  router.post('/:tid/messages/:mid', (req, res) => {
    const observable = api.getThreadMessage(req.params.root, req.params.tid, req.params.mid)
    observable.first().subscribe(getHandler(res))
    observable.subscribe(pushHandler(req))
  })

  router.post('/:tid/users', (req, res) => {
    const observable = api.getThreadUsers(req.params.root, req.params.tid)
    observable.first().subscribe(getHandler(res))
    observable.subscribe(pushHandler(req))
  })

  router.post('/:tid/users/:uid', (req, res) => {
    const observable = api.getThreadUser(req.params.root, req.params.tid, req.params.uid)
    observable.first().subscribe(getHandler(res))
    observable.subscribe(pushHandler(req))
  })

  return router
}
