import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { OktaCallbackComponent } from "@okta/okta-angular";

import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
import { DashboardLayoutComponent } from "./layouts/dashboard-layout/dashboard-layout.component";

const routes: Routes = [
  {
    path: "",
    component: DashboardLayoutComponent,
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
  //Auth
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
export class AppRoutingModule {}
