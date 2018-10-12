'use strict'

const getHandler = require('./get-handler')

const getFlaggedMessages = api => (req, res) => {
  api.getFlaggedMessages(req.params.root)
    .first().subscribe(getHandler(res))
}

const getFlaggedMessage = api => (req, res) => {
  api.getFlaggedMessage(req.params.root, req.params.mid)
    .first().subscribe(getHandler(res))
}

const flagMessage = api => (req, res) => {
  api.flagMessage(req.params.root, req.params.tid, req.params.mid)
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(500))
}

const unflagMessage = api => (req, res) => {
  api.unflagMessage(req.params.root, req.params.mid)
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(500))
}

const deleteFlaggedMessage = api => (req, res) => {
  api.deleteFlaggedMessage(req.params.root, req.params.mid)
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(500))
}

module.exports = api => {
  return {
    getFlaggedMessages: getFlaggedMessages(api),
    getFlaggedMessage: getFlaggedMessage(api),
    flagMessage: flagMessage(api),
    unflagMessage: unflagMessage(api),
    deleteFlaggedMessage: deleteFlaggedMessage(api)
  }
}
