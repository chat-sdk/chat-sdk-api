'use strict'

module.exports = ({ db, get }) => {
  const getOnline =  root => {
    return get(db.ref(root + '/online'))
  }

  const getUsers = root => {
    return get(db.ref(root + '/users'))
  }

  const getUsersByMetaValue = async (root, index, value) => {
    const ref = db.ref(root + '/users')
    const snapshot = await ref.orderByChild('meta/' + index).equalTo(value).once('value')
    return snapshot.val()
  }

  const getUser = (root, uid) => {
    return get(db.ref(root + '/users/' + uid))
  }

  const getUserMeta = (root, uid) => {
    return get(db.ref(root + '/users/' + uid + '/meta'))
  }

  const getUserMetaValue = (root, uid, index) => {
    return get(db.ref(root + '/users/' + uid + '/meta/' + index))
  }

  const getUserThreads = (root, uid) => {
    return get(db.ref(root + '/users/' + uid + '/threads'))
  }

  const setUserMeta = (root, uid, meta) => {
    return db.ref(root + '/users/' + uid + '/meta').set(meta)
  }

  const deleteUser = async (root, uid) => {
    const threads = await getUserThreads(root, uid)
    const tids = threads && Object.keys(threads)
    if (tids && tids.length > 0) {
      await Promise.all(tids.map(tid => db.ref(root + '/threads/' + tid + '/users/' + uid).remove()))
    }
    return db.ref(root + '/users/' + uid).remove()
  }

  return {
    getOnline,
    getUsers,
    getUsersByMetaValue,
    getUser,
    getUserMeta,
    getUserMetaValue,
    getUserThreads,
    setUserMeta,
    deleteUser
  }
}
