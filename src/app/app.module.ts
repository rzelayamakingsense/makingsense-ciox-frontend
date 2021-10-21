import { NgModule } from "@angular/core";

import { CoreModule } from "./core/core.module";
import { SharedModule } from "./shared/shared.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
import { DashboardLayoutComponent } from "./layouts/dashboard-layout/dashboard-layout.component";

import { NgxSpinnerModule } from "ngx-spinner";
import { ToastrModule } from "ngx-toastr";
import { OKTA_CONFIG, OktaAuthModule } from "@okta/okta-angular";
import { OktaAuth } from "@okta/okta-auth-js";

import { Config } from './helpers/okta'

@NgModule({
  declarations: [AppComponent, AuthLayoutComponent, DashboardLayoutComponent],
  imports: [
    CoreModule,
    SharedModule,

    OktaAuthModule,
    NgxSpinnerModule,
    ToastrModule.forRoot(
      {
        preventDuplicates: true
      }
    ),

    AppRoutingModule,
  ],
  providers: [
    { provide: OKTA_CONFIG, useValue: { oktaAuth: new OktaAuth(Config.oidc) } },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
