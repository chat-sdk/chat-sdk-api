'use strict'

const fetchFlaggedMessages = api => (req, res, next) => {
  api.fetchFlaggedMessages(req.params.root)
    .then(data => (data && res.json(data) || res.sendStatus(404), next()))
    .catch(err => (res.send(err.message || err), next()))
}

const fetchFlaggedMessage = api => (req, res, next) => {
  api.fetchFlaggedMessage(req.params.root, req.params.mid)
    .then(data => (data && res.json(data) || res.sendStatus(404), next()))
    .catch(err => (res.send(err.message || err), next()))
}

const flagMessage = api => (req, res, next) => {
  api.flagMessage(req.params.root, req.params.tid, req.params.mid)
    .then(() => (res.sendStatus(200), next()))
    .catch(() => (res.sendStatus(500), next()))
}

const unflagMessage = api => (req, res, next) => {
  api.unflagMessage(req.params.root, req.params.mid)
    .then(() => (res.sendStatus(200), next()))
    .catch(() => (res.sendStatus(500), next()))
}

const deleteFlaggedMessage = api => (req, res, next) => {
  api.deleteFlaggedMessage(req.params.root, req.params.mid)
    .then(() => (res.sendStatus(200), next()))
    .catch(() => (res.sendStatus(500), next()))
}


module.exports = api => {
  return {
    fetchFlaggedMessages: fetchFlaggedMessages(api),
    fetchFlaggedMessage: fetchFlaggedMessage(api),
    flagMessage: flagMessage(api),
    unflagMessage: unflagMessage(api),
    deleteFlaggedMessage: deleteFlaggedMessage(api)
  }
}
