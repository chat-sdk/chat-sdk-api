'use strict'

module.exports = ({ db, get }) => {
  const getFlaggedMessages = root => {
    return get(db.ref(root + '/flagged/messages'))
  }

  const getFlaggedMessage = (root, mid) => {
    return get(db.ref(root + '/flagged/messages/' + mid))
  }

  const flagMessage = (root, tid, mid) => {
    return Promise.reject(500)
  }

  const unflagMessage = (root, mid) => {
    return db.ref(root + '/flagged/messages/' + mid).remove()
  }

  const deleteFlaggedMessage = async (root, mid) => {
    const flaggedMessage = await getFlaggedMessage(root, mid)
    await unflagMessage(root, mid)
    return deleteThreadMessage(root, flaggedMessage.thread, mid)
  }

  return {
    getFlaggedMessages,
    getFlaggedMessage,
    flagMessage,
    unflagMessage,
    deleteFlaggedMessage
  }
}
