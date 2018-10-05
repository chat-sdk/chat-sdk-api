'use strict'

const admin = require('firebase-admin')
const serviceAccount = require('./serviceAccountKey')

module.exports = (databaseURL) => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: databaseURL || process.env.CS_API_FB_DATABASE_URL
  })
  const db = admin.database()

  const fetchData = ref => ref.once('value').then(s => s.val())

  const fetchCombinedThreadMeta = async ref => {
    const results = await Promise.all([
      fetchData(ref.child('details')),
      fetchData(ref.child('meta'))
    ])
    return { ...results[0], ...results[1] }
  }

  const fetchOnline = root => {
    return fetchData(db.ref(root + '/online'))
  }

  // Threads

  const fetchThreads = root => {
    return fetchData(db.ref(root + '/threads'))
  }

  const fetchPublicThreads = async root => {
    const publicThreads = await fetchData(db.ref(root + '/public-threads'))
    const tids = Object.keys(publicThreads || {})
    const threads = await Promise.all(tids.map(tid => {
      return fetchData(db.ref(root + '/threads/' + tid))
    }))
    return threads.reduce((o, v, i) => (o[tids[i]] = v, o), {})
  }

  const fetchThread = (root, tid) => {
    return fetchData(db.ref(root + '/threads/' + tid))
  }

  const fetchThreadMeta = (root, tid) => {
    return fetchCombinedThreadMeta(db.ref(root + '/threads/' + tid))
  }

  const fetchThreadMetaValue = async (root, tid, index) => {
    const data = await fetchCombinedThreadMeta(db.ref(root + '/threads/' + tid))
    return (data||{})[index]
  }

  const fetchThreadMessages = (root, tid) => {
    return fetchData(db.ref(root + '/threads/' + tid + '/messages'))
  }

  const fetchThreadMessage = (root, tid, mid) => {
    return fetchData(db.ref(root + '/threads/' + tid + '/messages/' + mid))
  }

  const fetchThreadUsers = (root, tid) => {
    return fetchData(db.ref(root + '/threads/' + tid + '/users'))
  }

  const fetchThreadUser = (root, tid, uid) => {
    return fetchData(db.ref(root + '/threads/' + tid + '/users/' + uid))
  }

  const setThreadMeta = async (root, tid, meta) => {
    await db.ref(root + '/threads/' + tid + '/details').set(meta)
    return db.ref(root + '/threads/' + tid + '/meta').set(meta)
  }

  const deleteThreadMessage = async (root, tid, mid) => {
    await db.ref(root + '/threads/' + tid + '/messages/' + mid).remove()
    const messages = Object.values(await fetchThreadMessages(root, tid) || {})
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
      return lastMessageRef.set(lastMessage)
    } else {
      console.log('No messages left')
      return lastMessageRef.set(null)
    }
  }

  const deleteThreadUser = (root, tid, uid) => {
    return db.ref(root + '/threads/' + tid + '/users/' + uid).remove()
  }

  const deleteThread = async (root, tid) => {
    await db.ref(root + '/threads/' + tid).remove()
    return db.ref(root + '/public-threads/' + tid).remove()
  }

  // Users

  const fetchUsers = root => {
    return fetchData(db.ref(root + '/users'))
  }

  const fetchUsersByMetaValue = async (root, index, value) => {
    const ref = db.ref(root + '/users')
    const snapshot = await ref.orderByChild('meta/' + index).equalTo(value).once('value')
    return snapshot.val()
  }

  const fetchUser = (root, uid) => {
    return fetchData(db.ref(root + '/users/' + uid))
  }

  const fetchUserMeta = (root, uid) => {
    return fetchData(db.ref(root + '/users/' + uid + '/meta'))
  }

  const fetchUserMetaValue = (root, uid, index) => {
    return fetchData(db.ref(root + '/users/' + uid + '/meta/' + index))
  }

  const fetchUserThreads = (root, uid) => {
    return fetchData(db.ref(root + '/users/' + uid + '/threads'))
  }

  const setUserMeta = (root, uid, meta) => {
    return db.ref(root + '/users/' + uid + '/meta').set(meta)
  }

  const deleteUser = async (root, uid) => {
    const threads = await fetchUserThreads(root, uid)
    const tids = threads && Object.keys(threads)
    if (tids && tids.length > 0) {
      await Promise.all(tids.map(tid => db.ref(root + '/threads/' + tid + '/users/' + uid).remove()))
    }
    return db.ref(root + '/users/' + uid).remove()
  }

  // Moderation

  const fetchFlaggedMessages = root => {
    return fetchData(db.ref(root + '/flagged/messages'))
  }

  const fetchFlaggedMessage = (root, mid) => {
    return fetchData(db.ref(root + '/flagged/messages/' + mid))
  }

  const flagMessage = (root, tid, mid) => {
    return Promise.reject(500)
  }

  const unflagMessage = (root, mid) => {
    return db.ref(root + '/flagged/messages/' + mid).remove()
  }

  const deleteFlaggedMessage = async (root, mid) => {
    const flaggedMessage = await fetchFlaggedMessage(root, mid)
    await unflagMessage(root, mid)
    return deleteThreadMessage(root, flaggedMessage.thread, mid)
  }

  return {
    fetchOnline,

    fetchThreads,
    fetchPublicThreads,
    fetchThread,
    fetchThreadMeta,
    fetchThreadMetaValue,
    fetchThreadMessages,
    fetchThreadMessage,
    fetchThreadUsers,
    fetchThreadUser,
    setThreadMeta,
    deleteThreadMessage,
    deleteThreadUser,
    deleteThread,

    fetchUsers,
    fetchUsersByMetaValue,
    fetchUser,
    fetchUserMeta,
    fetchUserMetaValue,
    fetchUserThreads,
    setUserMeta,
    deleteUser,

    fetchFlaggedMessages,
    fetchFlaggedMessage,
    flagMessage,
    unflagMessage,
    deleteFlaggedMessage
  }
}
