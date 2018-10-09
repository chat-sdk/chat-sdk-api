'use strict'

const admin = require('firebase-admin')
const { fromEventPattern } = require('rxjs')
require('rxjs/add/operator/map')

module.exports = () => {
  const serviceAccount = require('./serviceAccountKey')
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: serviceAccount.databaseURL
  })
  return {
    db: admin.database(),
    get: ref => fromEventPattern(
      handler => ref.on('value', handler),
      handler => ref.off('value', handler)
    ).map(snapshot => snapshot.val())
  }
}
