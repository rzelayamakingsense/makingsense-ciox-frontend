export const environment = {
  production: true,
  mock: false,
  host: 'http://localhost:5000',
  api: 'api',
  version: '',

  OKTA_ISSUER: 'https://dev-73966756.okta.com/oauth2/default',
  OKTA_CLIENT_ID: '0oa20tfim5H98fdz25d7',
  OKTA_TESTING_DISABLEHTTPSCHECK: false,
  OKTA_REDIRECT_URI: 'http://localhost:4200/callback',
  OKTA_MESSAGE_URL: 'http://localhost:8000/api/messages',
  OKTA_SCOPES: ['openid', 'profile', 'email', 'claims'],
};
