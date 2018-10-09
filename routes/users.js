'use strict'

const getOnline = api => (req, res) => {
  api.getOnline(req.params.root)
    .first().subscribe(
      data => data != null && res.json(data) || res.sendStatus(404),
      err => res.send(err.message || err)
    )
}

const getUsers = api => (req, res) => {
  api.getUsers(req.params.root)
    .first().subscribe(
      data => data != null && res.json(data) || res.sendStatus(404),
      err => res.send(err.message || err)
    )
}

const getUser = api => (req, res) => {
  api.getUser(req.params.root, req.params.uid)
    .first().subscribe(
      data => data != null && res.json(data) || res.sendStatus(404),
      err => res.send(err.message || err)
    )
}

const getUserMeta = api => (req, res) => {
  api.getUserMeta(req.params.root, req.params.uid)
    .first().subscribe(
      data => data != null && res.json(data) || res.sendStatus(404),
      err => res.send(err.message || err)
    )
}

const getUserMetaValue = api => (req, res) => {
  api.getUserMetaValue(req.params.root, req.params.uid, req.params.index)
    .first().subscribe(
      data => data != null && res.json(data) || res.sendStatus(404),
      err => res.send(err.message || err)
    )
}

const getUserThreads = api => (req, res) => {
  api.getUserThreads(req.params.root, req.params.uid)
    .first().subscribe(
      data => data != null && res.json(data) || res.sendStatus(404),
      err => res.send(err.message || err)
    )
}

const getUsersByMetaValue = api => (req, res) => {
  api.getUsersByMetaValue(req.params.root, req.params.index, req.params.query)
    .first().subscribe(
      data => data != null && res.json(data) || res.sendStatus(404),
      err => res.send(err.message || err)
    )
}

const setUserMeta = api => (req, res) => {
  api.setUserMeta(req.params.root, req.params.uid, req.body)
    .then(() => (res.sendStatus(200), next()))
    .catch(() => (res.sendStatus(500), next()))
}

const deleteUser = api => (req, res) => {
  api.deleteUser(req.params.root, req.params.uid)
    .then(() => (res.sendStatus(200), next()))
    .catch(() => (res.sendStatus(500), next()))
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
