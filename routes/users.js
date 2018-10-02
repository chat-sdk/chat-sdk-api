'use strict'

const fetchUsers = api => (req, res, next) => {
  api.fetchUsers(req.params.root)
    .then(data => (data && res.json(data) || res.sendStatus(404), next()))
    .catch(err => (res.send(err.message || err), next()))
}

const fetchUser = api => (req, res, next) => {
  api.fetchUser(req.params.root, req.params.uid)
    .then(data => (data && res.json(data) || res.sendStatus(404), next()))
    .catch(err => (res.send(err.message || err), next()))
}

const fetchUserMeta = api => (req, res, next) => {
  api.fetchUserMeta(req.params.root, req.params.uid)
    .then(data => (data && res.json(data) || res.sendStatus(404), next()))
    .catch(err => (res.send(err.message || err), next()))
}

const fetchUserMetaValue = api => (req, res, next) => {
  api.fetchUserMetaValue(req.params.root, req.params.uid, req.params.index)
    .then(data => (data && res.json(data) || res.sendStatus(404), next()))
    .catch(err => (res.send(err.message || err), next()))
}

const fetchUserThreads = api => (req, res, next) => {
  api.fetchUserThreads(req.params.root, req.params.uid)
    .then(data => (data && res.json(data) || res.sendStatus(404), next()))
    .catch(err => (res.send(err.message || err), next()))
}

const fetchUsersByMetaValue = api => (req, res, next) => {
  api.fetchUsersByMetaValue(req.params.root, req.params.index, req.params.query)
    .then(data => (data && res.json(data) || res.sendStatus(404), next()))
    .catch(err => (res.send(err.message || err), next()))
}

const setUserMeta = api => (req, res, next) => {
  api.setUserMeta(req.params.root, req.params.uid, req.body)
    .then(() => (res.sendStatus(200), next()))
    .catch(() => (res.sendStatus(500), next()))
}

const deleteUser = api => (req, res, next) => {
  api.deleteUser(req.params.root, req.params.uid)
    .then(() => (res.sendStatus(200), next()))
    .catch(() => (res.sendStatus(500), next()))
}

module.exports = api => {
  return {
    fetchUsers: fetchUsers(api),
    fetchUser: fetchUser(api),
    fetchUserMeta: fetchUserMeta(api),
    fetchUserMetaValue: fetchUserMetaValue(api),
    fetchUserThreads: fetchUserThreads(api),
    fetchUsersByMetaValue: fetchUsersByMetaValue(api),
    setUserMeta: setUserMeta(api),
    deleteUser: deleteUser(api)
  }
}
