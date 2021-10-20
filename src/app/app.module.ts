import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
import { DashboardLayoutComponent } from "./layouts/dashboard-layout/dashboard-layout.component";

import { OKTA_CONFIG, OktaAuthModule } from "@okta/okta-angular";
import { OktaAuth } from "@okta/okta-auth-js";

import sampleConfig from "./app.config";
import { HttpClientModule } from "@angular/common/http";
import { SharedModule } from "./shared/shared.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from "ngx-toastr";
import { CommonModule } from "@angular/common";

const oktaConfig = Object.assign(
  sampleConfig.oidc
);

const oktaAuth = new OktaAuth(oktaConfig);

@NgModule({
  declarations: [AppComponent, AuthLayoutComponent, DashboardLayoutComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    OktaAuthModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(
      {
        preventDuplicates: true
      }
    ),
    CommonModule,
    SharedModule,
  ],
  providers: [
    { provide: OKTA_CONFIG, useValue: { oktaAuth } },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: OktaAuthInterceptor,
    //   multi: true,
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
