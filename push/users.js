'use strict'

const router = require('express').Router({ mergeParams: true })
const getHandler = require('../routes/get-handler')

module.exports = pushHandler => api => {
  router.post('/', (req, res) => {
    const observable = api.getUsers(req.params.root)
    observable.first().subscribe(getHandler(res))
    observable.subscribe(pushHandler(req))
  })

  router.post('/:uid', (req, res) => {
    const observable = api.getUser(req.params.root, req.params.uid)
    observable.first().subscribe(getHandler(res))
    observable.subscribe(pushHandler(req))
  })

  router.post('/:uid/meta', (req, res) => {
    const observable = api.getUserMeta(req.params.root, req.params.uid)
    observable.first().subscribe(getHandler(res))
    observable.subscribe(pushHandler(req))
  })

  router.post('/:uid/meta/:index', (req, res) => {
    const observable = api.getUserMetaValue(req.params.root, req.params.uid, req.params.index)
    observable.first().subscribe(getHandler(res))
    observable.subscribe(pushHandler(req))
  })

  router.post('/:uid/threads', (req, res) => {
    const observable = api.getUserThreads(req.params.root, req.params.uid)
    observable.first().subscribe(getHandler(res))
    observable.subscribe(pushHandler(req))
  })

  return router
}
