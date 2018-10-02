module.exports =  {
  type: process.env.CS_API_FB_TYPE,
  project_id: process.env.CS_API_FB_PROJECT_ID,
  private_key_id: process.env.CS_API_FB_PRIVATE_KEY_ID,
  private_key: process.env.CS_API_FB_PRIVATE_KEY.split('\\n').join('\n'),
  client_email: process.env.CS_API_FB_CLIENT_EMAIL,
  client_id: process.env.CS_API_FB_CLIENT_ID,
  auth_uri: process.env.CS_API_FB_AUTH_URI,
  token_uri: process.env.CS_API_FB_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.CS_API_FB_AUTH_PROPVIDER_CERT_URL,
  client_x509_cert_url: process.env.CS_API_FB_CLIENT_CERT_URL
}
