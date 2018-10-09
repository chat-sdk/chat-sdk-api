module.exports = {
  public_key: process.env.VAPID_PUBLIC_KEY,
  private_key: process.env.VAPID_PRIVATE_KEY,
  subject_url: process.env.VAPID_SUBJECT_URL,
  gcm_api_key: process.env.GCM_API_KEY
}
