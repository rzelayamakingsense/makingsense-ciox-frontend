import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PatientComponent } from './containers/patient/patient.component';
import { PatientDetailComponent } from './components/patient-detail/patient-detail.component';
import { PatientListComponent } from './components/patient-list/patient-list.component';
import { PatientDeleteComponent } from './components/patient-delete/patient-delete.component';

const routes: Routes = [
  {
    path: '',
    component: PatientComponent,
    data: { page: 'list' },
  },
  {
    path: 'new',
    component: PatientComponent,
    data: { page: 'new' },
  },
  {
    path: ':id',
    component: PatientComponent,
    data: { page: 'view' },
  },
  {
    path: 'edit/:id',
    component: PatientComponent,
    data: { page: 'edit' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientRoutingModule {
  static components = [PatientComponent, PatientListComponent, PatientDetailComponent, PatientDeleteComponent];
}
