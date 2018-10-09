'use strict'

const { combineLatest } = require('rxjs')
require('rxjs/add/operator/map')
require('rxjs/add/operator/first')
require('rxjs/add/operator/mergeMap')

module.exports = ({ db, get }) => {
  const getCombinedThreadMeta = ref => {
    return combineLatest(
      get(ref.child('details')),
      get(ref.child('meta'))
    ).map(values => ({ ...values[0], ...values[1] }))
  }

  const getThreads = root => {
    return get(db.ref(root + '/threads'))
  }

  const getPublicThreads = root => {
    return get(db.ref(root + '/public-threads'))
      .mergeMap(publicThreads => {
        const tids = Object.keys(publicThreads || {})
        const observables = tids.map(tid => get(db.ref(root + '/threads/' + tid)))
        return combineLatest(observables)
          .map(values => values.reduce((o, v, i) => (o[tids[i]] = v, o), {}))
      })
  }

  const getThread = (root, tid) => {
    return get(db.ref(root + '/threads/' + tid))
  }

  const getThreadMeta = (root, tid) => {
    return getCombinedThreadMeta(db.ref(root + '/threads/' + tid))
  }

  const getThreadMetaValue = (root, tid, index) => {
    return getCombinedThreadMeta(db.ref(root + '/threads/' + tid))
      .map(data => (data || {})[index])
  }

  const getThreadMessages = (root, tid) => {
    return get(db.ref(root + '/threads/' + tid + '/messages'))
  }

  const getThreadMessage = (root, tid, mid) => {
    return get(db.ref(root + '/threads/' + tid + '/messages/' + mid))
  }

  const getThreadUsers = (root, tid) => {
    return get(db.ref(root + '/threads/' + tid + '/users'))
  }

  const getThreadUser = (root, tid, uid) => {
    return get(db.ref(root + '/threads/' + tid + '/users/' + uid))
  }

  const setThreadMeta = async (root, tid, meta) => {
    await db.ref(root + '/threads/' + tid + '/details').set(meta)
    return db.ref(root + '/threads/' + tid + '/meta').set(meta)
  }

  const deleteThreadMessage = async (root, tid, mid) => {
    await db.ref(root + '/threads/' + tid + '/messages/' + mid).remove()
    return new Promise(resolve => {
      getThreadMessages(root, tid)
        .first().subscribe(messages => {
          messages = Object.values(messages || {})
          const lastMessageRef = db.ref(root + '/threads/' + tid + '/lastMessage')
          if (messages.length > 0) {
            const message = messages[messages.length - 1]
            const lastMessage = {
              JSON: message.JSON,
              date: message.date,
              payload: message.payload,
              type: message.type,
              'user-firebase-id': message['user-firebase-id'],
              userName: 'Unnamed'
            }
            console.log('Setting last message:', lastMessage)
            resolve(lastMessageRef.set(lastMessage))
          } else {
            console.log('No messages left')
            resolve(lastMessageRef.set(null))
          }
        })
    })
  }

  const deleteThreadUser = (root, tid, uid) => {
    return db.ref(root + '/threads/' + tid + '/users/' + uid).remove()
  }

  const deleteThread = async (root, tid) => {
    await db.ref(root + '/threads/' + tid).remove()
    return db.ref(root + '/public-threads/' + tid).remove()
  }

  return {
    getThreads,
    getPublicThreads,
    getThread,
    getThreadMeta,
    getThreadMetaValue,
    getThreadMessages,
    getThreadMessage,
    getThreadUsers,
    getThreadUser,
    setThreadMeta,
    deleteThreadMessage,
    deleteThreadUser,
    deleteThread
  }
}
