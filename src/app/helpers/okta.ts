import { environment } from '@env/environment';

const Config = {
  oidc: {
    clientId: environment.OKTA_CLIENT_ID,
    issuer: environment.OKTA_ISSUER,
    redirectUri: environment.OKTA_REDIRECT_URI,
    scopes: environment.OKTA_SCOPES,
    testing: {
      disableHttpsCheck: `${environment.OKTA_TESTING_DISABLEHTTPSCHECK}`,
    },
  },
  resourceServer: {
    messagesUrl: environment.OKTA_MESSAGE_URL,
  },
};

export { Config };
