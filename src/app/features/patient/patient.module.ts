import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { ModalModule, BsModalService } from "ngx-bootstrap/modal";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { NgxBootstrapIconsModule } from "ngx-bootstrap-icons";
import { pencilSquare, trash, xLg, eye } from "ngx-bootstrap-icons";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { PatientRoutingModule } from "./patient-routing.module";
import { PatientListComponent } from "./patient-list/patient-list.component";
import { CreatePatientComponent } from "./create-patient/create-patient.component";
import { UpdatePatientComponent } from "./update-patient/update-patient.component";
import { DeletePatientComponent } from "./delete-patient/delete-patient.component";

import { PatientApiService } from "./patient-api.service";
import { PatientUserInfoComponent } from "./components/patient-user-info/patient-user-info.component";
import { SharedModule } from "src/app/shared/shared.module";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { OktaMockInterceptor } from "src/app/core/interceptors/okta-mock.interceptor";

@NgModule({
  declarations: [
    PatientListComponent,

    CreatePatientComponent,
    UpdatePatientComponent,
    DeletePatientComponent,

    PatientUserInfoComponent,
  ],
  imports: [
    HttpClientModule,

    SharedModule,

    PatientRoutingModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    NgxBootstrapIconsModule.pick({ pencilSquare, trash, xLg, eye }),

    BsDatepickerModule.forRoot(),
  ],
  providers: [PatientApiService, BsModalService, {
    provide: HTTP_INTERCEPTORS,
    useClass: OktaMockInterceptor,
    multi: true,
  }],
})
export class PatientModule { }
