const ISSUER = "https://dev-73966756.okta.com/oauth2/default";
const CLIENT_ID = "0oa20tfim5H98fdz25d7";
const OKTA_TESTING_DISABLEHTTPSCHECK = false;

export default {
  oidc: {
    clientId: CLIENT_ID,
    issuer: ISSUER,
    redirectUri: "http://localhost:4200/callback",
    scopes: ["openid", "profile", "email"],
    testing: {
      disableHttpsCheck: `${OKTA_TESTING_DISABLEHTTPSCHECK}`,
    },
  },
  resourceServer: {
    messagesUrl: "http://localhost:8000/api/messages",
  },
};
