'use strict'

const compression = require('compression')
const bodyParser = require('body-parser')
const express = require('express')
const http = require('http')
const ip = require('ip')
const cors = require('./cors')
const push = require('./push')

// Setup Firebase and APIs
const firebaseAPI = require('./firebase/api')()

// Setup routes with the Firebase API
const users = require('./routes/users')(firebaseAPI.users)
const threads = require('./routes/threads')(firebaseAPI.threads)
const moderation = require('./routes/moderation')(firebaseAPI.moderation)

const app = express()
app.use(compression())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use('/push', push(firebaseAPI))

const routes = (root = ':root') => {
  return [
    // Moderation
    { method: 'GET', path: '/' + root + '/flagged-messages', handler: moderation.getFlaggedMessages },
    { method: 'GET', path: '/' + root + '/flagged-messages/:mid', handler: moderation.getFlaggedMessage },
    { method: 'DELETE', path: '/' + root + '/flagged-messages/:mid', handler: moderation.deleteFlaggedMessage },
    { method: 'PUT', path: '/' + root + '/flag-message/:tid/:mid', handler: moderation.flagMessage },
    { method: 'PUT', path: '/' + root + '/unflag-message/:mid', handler: moderation.unflagMessage },
    // Threads
    { method: 'GET', path: '/' + root + '/threads', handler: threads.getThreads },
    { method: 'GET', path: '/' + root + '/public-threads', handler: threads.getPublicThreads },
    { method: 'GET', path: '/' + root + '/threads/:tid', handler: threads.getThread },
    { method: 'DELETE', path: '/' + root + '/threads/:tid', handler: threads.deleteThread },
    { method: 'GET', path: '/' + root + '/threads/:tid/meta', handler: threads.getThreadMeta },
    { method: 'POST', path: '/' + root + '/threads/:tid/meta', handler: threads.setThreadMeta },
    { method: 'GET', path: '/' + root + '/threads/:tid/meta/:index', handler: threads.getThreadMetaValue },
    { method: 'GET', path: '/' + root + '/threads/:tid/messages', handler: threads.getThreadMessages },
    { method: 'GET', path: '/' + root + '/threads/:tid/messages/:mid', handler: threads.getThreadMessage },
    { method: 'DELETE', path: '/' + root + '/threads/:tid/messages/:mid', handler: threads.deleteThreadMessage },
    { method: 'GET', path: '/' + root + '/threads/:tid/users', handler: threads.getThreadUsers },
    { method: 'GET', path: '/' + root + '/threads/:tid/users/:uid', handler: threads.getThreadUser },
    { method: 'DELETE', path: '/' + root + '/threads/:tid/users/:uid', handler: threads.deleteThreadUser },
    // Users
    { method: 'GET', path: '/' + root + '/online', handler: users.getOnline },
    { method: 'GET', path: '/' + root + '/users', handler: users.getUsers },
    { method: 'GET', path: '/' + root + '/users/:uid', handler: users.getUser },
    { method: 'DELETE', path: '/' + root + '/users/:uid', handler: users.deleteUser },
    { method: 'GET', path: '/' + root + '/users/:uid/meta', handler: users.getUserMeta },
    { method: 'POST', path: '/' + root + '/users/:uid/meta', handler: users.setUserMeta },
    { method: 'GET', path: '/' + root + '/users/:uid/meta/:index', handler: users.getUserMetaValue },
    { method: 'GET', path: '/' + root + '/users/:uid/threads', handler: users.getUserThreads },
    { method: 'GET', path: '/' + root + '/users/by/:index/:query', handler: users.getUsersByMetaValue },
  ]
}

app.get('/', (_, res) => {
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
