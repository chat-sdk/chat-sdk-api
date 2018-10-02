'use strict'

const compression = require('compression')
const bodyParser = require('body-parser')
const express = require('express')
const http = require('http')
const ip = require('ip')

const cors = require('./cors')
const api = require('./firebase-api')()
const users = require('./routes/users')(api)
const threads = require('./routes/threads')(api)
const moderation = require('./routes/moderation')(api)

const app = express()
app.use(compression())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

const fetchOnline = (req, res, next) => {
  api.fetchOnline(req.params.root)
    .then(data => (data && res.json(data) || res.sendStatus(404), next()))
    .catch(err => (res.send(err.message || err), next()))
}

const routes = (root = ':root') => {
  return [
    { method: 'GET', path: '/' + root + '/online', handler: fetchOnline },
    // Moderation
    { method: 'GET', path: '/' + root + '/flagged-messages', handler: moderation.fetchFlaggedMessages },
    { method: 'GET', path: '/' + root + '/flagged-messages/:mid', handler: moderation.fetchFlaggedMessage },
    { method: 'DELETE', path: '/' + root + '/flagged-messages/:mid', handler: moderation.deleteFlaggedMessage },
    { method: 'PUT', path: '/' + root + '/flag-message/:tid/:mid', handler: moderation.flagMessage },
    { method: 'PUT', path: '/' + root + '/unflag-message/:mid', handler: moderation.unflagMessage },
    // Threads
    { method: 'GET', path: '/' + root + '/threads', handler: threads.fetchThreads },
    { method: 'GET', path: '/' + root + '/public-threads', handler: threads.fetchPublicThreads },
    { method: 'GET', path: '/' + root + '/threads/:tid', handler: threads.fetchThread },
    { method: 'DELETE', path: '/' + root + '/threads/:tid', handler: threads.deleteThread },
    { method: 'GET', path: '/' + root + '/threads/:tid/meta', handler: threads.fetchThreadMeta },
    { method: 'POST', path: '/' + root + '/threads/:tid/meta', handler: threads.setThreadMeta },
    { method: 'GET', path: '/' + root + '/threads/:tid/meta/:index', handler: threads.fetchThreadMetaValue },
    { method: 'GET', path: '/' + root + '/threads/:tid/messages', handler: threads.fetchThreadMessages },
    { method: 'GET', path: '/' + root + '/threads/:tid/messages/:mid', handler: threads.fetchThreadMessage },
    { method: 'DELETE', path: '/' + root + '/threads/:tid/messages/:mid', handler: threads.deleteThreadMessage },
    { method: 'GET', path: '/' + root + '/threads/:tid/users', handler: threads.fetchThreadUsers },
    { method: 'GET', path: '/' + root + '/threads/:tid/users/:uid', handler: threads.fetchThreadUser },
    { method: 'DELETE', path: '/' + root + '/threads/:tid/users/:uid', handler: threads.deleteThreadUser },
    // Users
    { method: 'GET', path: '/' + root + '/users', handler: users.fetchUsers },
    { method: 'GET', path: '/' + root + '/users/:uid', handler: users.fetchUser },
    { method: 'DELETE', path: '/' + root + '/users/:uid', handler: users.deleteUser },
    { method: 'GET', path: '/' + root + '/users/:uid/meta', handler: users.fetchUserMeta },
    { method: 'POST', path: '/' + root + '/users/:uid/meta', handler: users.setUserMeta },
    { method: 'GET', path: '/' + root + '/users/:uid/meta/:index', handler: users.fetchUserMetaValue },
    { method: 'GET', path: '/' + root + '/users/:uid/threads', handler: users.fetchUserThreads },
    { method: 'GET', path: '/' + root + '/users/by/:index/:query', handler: users.fetchUsersByMetaValue },
  ]
}

app.get('/', (req, res) => {
  res.json(routes().map(r => ({ method: r.method, path: r.path })))
})

app.get('/:root', (req, res) => {
  res.json(routes(req.params.root).map(r => ({ method: r.method, path: r.path })))
})

for (const route of routes()) {
  app[route.method.toLowerCase()](route.path, route.handler)
}

const port = Number(process.env.PORT || 3000)
http.createServer(app).listen(port, ip.address(), err => {
  if (err) {
    console.error(err)
    process.exit(1)
  } else {
    console.log(`Server running on http://${ip.address()}:${port}`)
  }
})
