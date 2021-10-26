import { Component, OnInit } from "@angular/core";

// @ts-ignore-line
import * as OktaSignIn from "@okta/okta-signin-widget";
import { OktaAuth } from "@okta/okta-auth-js";

import { Config } from "app/helpers/okta";

const DEFAULT_ORIGINAL_URI = window.location.origin;

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  signIn: OktaSignIn;

  constructor(public oktaAuth: OktaAuth) {
    this.signIn = new OktaSignIn({
      baseUrl: Config.oidc.issuer.split("/oauth2")[0],
      clientId: Config.oidc.clientId,
      redirectUri: Config.oidc.redirectUri,
      logo: Config.oidc.logo,
      i18n: Config.oidc.i18n,
      authParams: {
        issuer: Config.oidc.issuer,
      }
    });
  }

  async ngOnInit() {
    this.signIn
      .showSignInToGetTokens({
        el: "#sign-in-widget",
        scopes: Config.oidc.scopes,
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
