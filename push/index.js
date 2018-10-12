'use strict'

const router = require('express').Router()
const webpush = require('web-push')
const secrets = require('./secrets')
const users = require('./users')
const threads = require('./threads')
const moderation = require('./moderation')
const getHandler = require('../routes/get-handler')

const createPushHandler = webpush => req => ({
  next: data => {
    if (data != null) {
      if (req.body) {
        webpush.sendNotification(req.body, JSON.stringify(data))
          .catch(err => console.error('Webpush error:', err))
      } else {
        console.error('Webpush error: req.body is undefined')
      }
    }
  },
  error: err => console.error(err.message || err)
})

module.exports = api => {
  webpush.setGCMAPIKey(secrets.gcm_api_key)
  webpush.setVapidDetails(secrets.subject_url, secrets.public_key, secrets.private_key)
  const pushHandler = createPushHandler(webpush)

  router.use('/subscribe/:root/users', users(pushHandler)(api.users))
  router.use('/subscribe/:root/threads', threads(pushHandler)(api.threads))
  router.use('/subscribe/:root/flagged-messages', moderation(pushHandler)(api.moderation))

  router.post('/subscribe/:root/online', (req, res) => {
    const observable = api.users.getOnline(req.params.root)
    observable.first().subscribe(getHandler(res))
    observable.subscribe(pushHandler(req))
  })

  router.post('/subscribe/:root/public-threads', (req, res) => {
    const observable = api.threads.getPublicThreads(req.params.root)
    observable.first().subscribe(getHandler(res))
    observable.subscribe(pushHandler(req))
  })

  return router
}
