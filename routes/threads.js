'use strict'

const getHandler = require('./get-handler')

const getThreads = api => (req, res) => {
  api.getThreads(req.params.root)
    .first().subscribe(getHandler(res))
}

const getPublicThreads = api => (req, res) => {
  api.getPublicThreads(req.params.root)
    .first().subscribe(getHandler(res))
}

const getThread = api => (req, res) => {
  api.getThread(req.params.root, req.params.tid)
    .first().subscribe(getHandler(res))
}

const getThreadMeta = api => (req, res) => {
  api.getThreadMeta(req.params.root, req.params.tid)
    .first().subscribe(getHandler(res))
}

const getThreadMetaValue = api => (req, res) => {
  api.getThreadMetaValue(req.params.root, req.params.tid, req.params.index)
    .first().subscribe(getHandler(res))
}

const getThreadMessages = api => (req, res) => {
  api.getThreadMessages(req.params.root, req.params.tid)
    .first().subscribe(getHandler(res))
}

const getThreadMessage = api => (req, res) => {
  api.getThreadMessage(req.params.root, req.params.tid, req.params.mid)
    .first().subscribe(getHandler(res))
}

const getThreadUsers = api => (req, res) => {
  api.getThreadUsers(req.params.root, req.params.tid)
    .first().subscribe(getHandler(res))
}

const getThreadUser = api => (req, res) => {
  api.getThreadUser(req.params.root, req.params.tid, req.params.uid)
    .first().subscribe(getHandler(res))
}

const setThreadMeta = api => (req, res) => {
  api.setThreadMeta(req.params.root, req.params.tid, req.body)
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(500))
}

const deleteThreadMessage = api => (req, res) => {
  api.deleteThreadMessage(req.params.root, req.params.tid, req.params.mid)
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(500))
}

const deleteThreadUser = api => (req, res) => {
  api.deleteThreadUser(req.params.root, req.params.tid, req.params.uid)
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(500))
}

const deleteThread = api => (req, res) => {
  api.deleteThread(req.params.root, req.params.tid)
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(500))
}

module.exports = api => {
  return {
    getThreads: getThreads(api),
    getPublicThreads: getPublicThreads(api),
    getThread: getThread(api),
    getThreadMeta: getThreadMeta(api),
    getThreadMetaValue: getThreadMetaValue(api),
    getThreadMessages: getThreadMessages(api),
    getThreadMessage: getThreadMessage(api),
    getThreadUsers: getThreadUsers(api),
    getThreadUser: getThreadUser(api),
    setThreadMeta: setThreadMeta(api),
    deleteThreadMessage: deleteThreadMessage(api),
    deleteThreadUser: deleteThreadUser(api),
    deleteThread: deleteThread(api)
  }
}
