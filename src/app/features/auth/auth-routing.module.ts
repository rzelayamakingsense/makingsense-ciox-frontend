import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OktaCallbackComponent } from '@okta/okta-angular';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
    children: [
      {
        path: "login",
        component: LoginComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
