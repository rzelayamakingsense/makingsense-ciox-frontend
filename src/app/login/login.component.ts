import { Component, OnInit } from "@angular/core";

// @ts-ignore-line
import * as OktaSignIn from "@okta/okta-signin-widget";
import { OktaAuth } from "@okta/okta-auth-js";

import sampleConfig from "../app.config";

const DEFAULT_ORIGINAL_URI = window.location.origin;

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  signIn: any;

  constructor(public oktaAuth: OktaAuth) {
    this.signIn = new OktaSignIn({
      baseUrl: sampleConfig.oidc.issuer.split("/oauth2")[0],
      clientId: sampleConfig.oidc.clientId,
      redirectUri: sampleConfig.oidc.redirectUri,
      logo: "/assets/ciox-health-logo.png",
      i18n: {
        en: {
          "primaryauth.title": "Sign in to Angular & Company",
        },
      },
      authParams: {
        issuer: sampleConfig.oidc.issuer,
      },
    });
  }

  async ngOnInit() {
    this.signIn
      .showSignInToGetTokens({
        el: "#sign-in-widget",
        scopes: sampleConfig.oidc.scopes,
      })
      .then((tokens: any) => {
        const originalUri = this.oktaAuth.getOriginalUri();
        if (originalUri === DEFAULT_ORIGINAL_URI) {
          this.oktaAuth.setOriginalUri("/");
        }

        this.signIn.remove();
        this.oktaAuth.signInWithRedirect(tokens);
      })
      .catch((err: any) => {
        throw err;
      });
  }
}
