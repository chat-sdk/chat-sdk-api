'use strict'

const getHandler = require('./get-handler')

const getOnline = api => (req, res) => {
  api.getOnline(req.params.root)
    .first().subscribe(getHandler(res))
}

const getUsers = api => (req, res) => {
  api.getUsers(req.params.root)
    .first().subscribe(getHandler(res))
}

const getUsersByMetaValue = api => (req, res) => {
  api.getUsersByMetaValue(req.params.root, req.params.index, req.params.query)
    .first().subscribe(getHandler(res))
}

const getUser = api => (req, res) => {
  api.getUser(req.params.root, req.params.uid)
    .first().subscribe(getHandler(res))
}

const getUserMeta = api => (req, res) => {
  api.getUserMeta(req.params.root, req.params.uid)
    .first().subscribe(getHandler(res))
}

const getUserMetaValue = api => (req, res) => {
  api.getUserMetaValue(req.params.root, req.params.uid, req.params.index)
    .first().subscribe(getHandler(res))
}

const getUserThreads = api => (req, res) => {
  api.getUserThreads(req.params.root, req.params.uid)
    .first().subscribe(getHandler(res))
}

const setUserMeta = api => (req, res) => {
  api.setUserMeta(req.params.root, req.params.uid, req.body)
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(500))
}

const deleteUser = api => (req, res) => {
  api.deleteUser(req.params.root, req.params.uid)
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(500))
}

module.exports = api => {
  return {
    getOnline: getOnline(api),
    getUsers: getUsers(api),
    getUser: getUser(api),
    getUserMeta: getUserMeta(api),
    getUserMetaValue: getUserMetaValue(api),
    getUserThreads: getUserThreads(api),
    getUsersByMetaValue: getUsersByMetaValue(api),
    setUserMeta: setUserMeta(api),
    deleteUser: deleteUser(api)
  }
}
