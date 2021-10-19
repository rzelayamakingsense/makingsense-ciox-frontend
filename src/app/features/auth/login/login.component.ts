// Core
import { Component, OnInit } from "@angular/core";

// Okta
import * as OktaSignIn from "@okta/okta-signin-widget";
import { OktaAuth } from "@okta/okta-auth-js";

// Config
import sampleConfig from "../../../app.config";

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
      /**
       * Note: when using the Sign-In Widget for an OIDC flow, it still
       * needs to be configured with the base URL for your Okta Org. Here
       * we derive it from the given issuer for convenience.
       */
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

        // Remove the widget
        this.signIn.remove();

        // In this flow the redirect to Okta occurs in a hidden iframe
        this.oktaAuth.signInWithRedirect(tokens);
      })
      .catch((err: any) => {
        // Typically due to misconfiguration
        throw err;
      });
  }
}
