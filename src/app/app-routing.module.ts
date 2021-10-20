// Core
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

// Okta
import { OktaCallbackComponent } from "@okta/okta-angular";

// Components
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
import { DashboardLayoutComponent } from "./layouts/dashboard-layout/dashboard-layout.component";

const routes: Routes = [

  //App Routes
  {
    path: "",
    component: DashboardLayoutComponent,
    children: [
      {
        path: "",
        redirectTo: "/dashboard",
        pathMatch: "full"
      },
      {
        path: "dashboard",
        loadChildren: () => import("./features/dashboard/dashboard.module").then(m => m.DashboardModule)
      },
      {
        path: "patient",
        loadChildren: () => import("./features/patient/patient.module").then(m => m.PatientModule)
      }
    ]
  },
  //Auth Routes
  {
    path: "",
    component: AuthLayoutComponent,
    children: [
      {
        path: "",
        redirectTo: "/auth",
        pathMatch: "full"
      },
      {
        path: "auth",
        loadChildren: () => import("./features/auth/auth.module").then(m => m.AuthModule)
      }
    ]
  },
  {
    path: "callback",
    component: OktaCallbackComponent,
  },
];


// const routes: Routes = [
//   {
//     path: "",
//     component: HomeComponent,
//   },
//   {
//     path: "login/callback",
//     component: OktaCallbackComponent,
//   },
//   {
//     path: "login",
//     component: LoginComponent,
//   },
//   {
//     path: "profile",
//     component: ProfileComponent,
//     canActivate: [OktaAuthGuard],
//   },
//   {
//     path: "messages",
//     component: MessagesComponent,
//     canActivate: [OktaAuthGuard],
//   },
// ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
