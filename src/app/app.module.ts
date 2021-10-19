import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

// Layouts Components
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';

// Okta
import { OKTA_CONFIG, OktaAuthModule } from "@okta/okta-angular";
import { OktaAuth } from "@okta/okta-auth-js";
import { Router } from "@angular/router";

// Okta Configuration
import sampleConfig from "./app.config";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";

const oktaConfig = Object.assign(
  {
    onAuthRequired: (_, injector) => {
      const router = injector.get(Router);
      router.navigate(["/login"]); // Redirect the user to your custom login page
    },
  },
  sampleConfig.oidc
);
const oktaAuth = new OktaAuth(oktaConfig);

@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    DashboardLayoutComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // Okta
    OktaAuthModule,
  ],
  providers: [{ provide: OKTA_CONFIG, useValue: { oktaAuth } }],
  bootstrap: [AppComponent],
})
export class AppModule { }
