import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
import { DashboardLayoutComponent } from "./layouts/dashboard-layout/dashboard-layout.component";

import { OKTA_CONFIG, OktaAuthModule } from "@okta/okta-angular";
import { OktaAuth } from "@okta/okta-auth-js";
import { Router } from "@angular/router";

import sampleConfig from "./app.config";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { SharedModule } from "./shared/shared.module";
import { OktaAuthInterceptor } from "./core/interceptors/okta-auth.interceptor";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

const oktaConfig = Object.assign(
  {
    onAuthRequired: (_: any, injector: any) => {
      const router = injector.get(Router);
      router.navigate(["/login"]);
    },
  },
  sampleConfig.oidc
);
const oktaAuth = new OktaAuth(oktaConfig);

@NgModule({
  declarations: [AppComponent, AuthLayoutComponent, DashboardLayoutComponent],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    OktaAuthModule,
    SharedModule.forRoot(),
  ],
  providers: [
    { provide: OKTA_CONFIG, useValue: { oktaAuth } },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: OktaAuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
