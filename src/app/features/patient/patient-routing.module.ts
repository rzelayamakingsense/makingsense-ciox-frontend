import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OktaAuthGuard } from '@okta/okta-angular';
import { PatientListComponent } from './patient-list/patient-list.component';

const routes: Routes = [
  {
    path: "list",
    component: PatientListComponent,
    canActivate: [OktaAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
