'use strict'

const router = require('express').Router()
const webpush = require('web-push')
const secrets = require('./secrets')
const users = require('./users')
const threads = require('./threads')
const moderation = require('./moderation')

const subscribeHandler = webpush => (req, res) => ({
  next: data => {
    if (data != null) {
      res.json(data)
      if (req.body) {
        webpush.sendNotification(req.body, JSON.stringify(data))
          .catch(err => console.error('Webpush error:', err.message))
      } else {
        console.error('Webpush error: req.body is undefined')
      }
    } else res.sendStatus(404)
  },
  error: err => res.send(err.message || err)
})

module.exports = api => {
  webpush.setGCMAPIKey(secrets.gcm_api_key)
  webpush.setVapidDetails(secrets.subject_url, secrets.public_key, secrets.private_key)
  const handler = subscribeHandler(webpush)

  router.use('/subscribe/:root/users', users(handler)(api.users))
  router.use('/subscribe/:root/threads', threads(handler)(api.threads))
  router.use('/subscribe/:root/flagged-messages', moderation(handler)(api.moderation))

  router.post('/subscribe/:root/online', (req, res) => {
    api.users.getOnline(req.params.root).subscribe(handler(req, res))
  })

  router.post('/subscribe/:root/public-threads', (req, res) => {
    api.threads.getPublicThreads(req.params.root).subscribe(handler(req, res))
  })

  return router
}
