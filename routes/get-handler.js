'use strict'

module.exports = res => ({
  next: data => data != null && res.json(data) || res.sendStatus(404),
  error: err => res.send(err.message || err)
})
