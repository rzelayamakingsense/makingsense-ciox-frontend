// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
