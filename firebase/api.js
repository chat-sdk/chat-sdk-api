'use strict'

module.exports = () => {
  const firebase = require('./index')()
  return {
    users: require('./users')(firebase),
    threads: require('./threads')(firebase),
    moderation: require('./moderation')(firebase)
  }
}
