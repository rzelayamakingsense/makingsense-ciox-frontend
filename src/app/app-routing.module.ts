import { Injector, NgModule } from "@angular/core";
import { Router, RouterModule, Routes } from "@angular/router";

import { OktaAuthGuard, OktaCallbackComponent } from "@okta/okta-angular";
import { OktaAuth } from "@okta/okta-auth-js";

import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
import { DashboardLayoutComponent } from "./layouts/dashboard-layout/dashboard-layout.component";

export function onNeedsAuthenticationGuard(oktaAuth: OktaAuth, injector: Injector) {
  const router = injector.get(Router);
  router.navigate(['/auth/login']);
}

const routes: Routes = [
  {
    path: "",
    component: DashboardLayoutComponent,
    canActivate: [OktaAuthGuard],
    data: {
      onAuthRequired: onNeedsAuthenticationGuard
    },
    children: [
      {
        path: "",
        redirectTo: "/dashboard",
        pathMatch: "full",
      },
      {
        path: "dashboard",
        loadChildren: () =>
          import("./features/dashboard/dashboard.module").then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: "patient",
        loadChildren: () =>
          import("./features/patient/patient.module").then(
            (m) => m.PatientModule
          ),
      },
    ],
  },
  // Auth
  {
    path: "",
    component: AuthLayoutComponent,
    children: [
      {
        path: "",
        redirectTo: "/auth",
        pathMatch: "full",
      },
      {
        path: "auth",
        loadChildren: () =>
          import("./features/auth/auth.module").then((m) => m.AuthModule),
      },
    ],
  },
  {
    path: "callback",
    component: OktaCallbackComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
