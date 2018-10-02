'use strict'

const fetchThreads = api => (req, res, next) => {
  api.fetchThreads(req.params.root)
    .then(data => (data && res.json(data) || res.sendStatus(404), next()))
    .catch(err => (res.send(err.message || err), next()))
}

const fetchPublicThreads = api => (req, res, next) => {
  api.fetchPublicThreads(req.params.root)
    .then(data => (data && res.json(data) || res.sendStatus(404), next()))
    .catch(err => (res.send(err.message || err), next()))
}

const fetchThread = api => (req, res, next) => {
  api.fetchThread(req.params.root, req.params.tid)
    .then(data => (data && res.json(data) || res.sendStatus(404), next()))
    .catch(err => (res.send(err.message || err), next()))
}

const fetchThreadMeta = api => (req, res, next) => {
  api.fetchThreadMeta(req.params.root, req.params.tid)
    .then(data => (data && res.json(data) || res.sendStatus(404), next()))
    .catch(err => (res.send(err.message || err), next()))
}

const fetchThreadMetaValue = api => (req, res, next) => {
  api.fetchThreadMetaValue(req.params.root, req.params.tid, req.params.index)
    .then(data => (data && res.json(data) || res.sendStatus(404), next()))
    .catch(err => (res.send(err.message || err), next()))
}

const fetchThreadMessages = api => (req, res, next) => {
  api.fetchThreadMessages(req.params.root, req.params.tid)
    .then(data => (data && res.json(data) || res.sendStatus(404), next()))
    .catch(err => (res.send(err.message || err), next()))
}

const fetchThreadMessage = api => (req, res, next) => {
  api.fetchThreadMessage(req.params.root, req.params.tid, req.params.mid)
    .then(data => (data && res.json(data) || res.sendStatus(404), next()))
    .catch(err => (res.send(err.message || err), next()))
}

const fetchThreadUsers = api => (req, res, next) => {
  api.fetchThreadUsers(req.params.root, req.params.tid)
    .then(data => (data && res.json(data) || res.sendStatus(404), next()))
    .catch(err => (res.send(err.message || err), next()))
}

const fetchThreadUser = api => (req, res, next) => {
  api.fetchThreadUser(req.params.root, req.params.tid, req.params.uid)
    .then(data => (data && res.json(data) || res.sendStatus(404), next()))
    .catch(err => (res.send(err.message || err), next()))
}

const setThreadMeta = api => (req, res, next) => {
  api.setThreadMeta(req.params.root, req.params.tid, req.body)
    .then(() => (res.sendStatus(200), next()))
    .catch(() => (res.sendStatus(500), next()))
}

const deleteThreadMessage = api => (req, res, next) => {
  api.deleteThreadMessage(req.params.root, req.params.tid, req.params.mid)
    .then(() => (res.sendStatus(200), next()))
    .catch(() => (res.sendStatus(500), next()))
}

const deleteThreadUser = api => (req, res, next) => {
  api.deleteThreadUser(req.params.root, req.params.tid, req.params.uid)
    .then(() => (res.sendStatus(200), next()))
    .catch(() => (res.sendStatus(500), next()))
}

const deleteThread = api => (req, res, next) => {
  api.deleteThread(req.params.root, req.params.tid)
    .then(() => (res.sendStatus(200), next()))
    .catch(() => (res.sendStatus(500), next()))
}

module.exports = api => {
  return {
    fetchThreads: fetchThreads(api),
    fetchPublicThreads: fetchPublicThreads(api),
    fetchThread: fetchThread(api),
    fetchThreadMeta: fetchThreadMeta(api),
    fetchThreadMetaValue: fetchThreadMetaValue(api),
    fetchThreadMessages: fetchThreadMessages(api),
    fetchThreadMessage: fetchThreadMessage(api),
    fetchThreadUsers: fetchThreadUsers(api),
    fetchThreadUser: fetchThreadUser(api),
    setThreadMeta: setThreadMeta(api),
    deleteThreadMessage: deleteThreadMessage(api),
    deleteThreadUser: deleteThreadUser(api),
    deleteThread: deleteThread(api)
  }
}
