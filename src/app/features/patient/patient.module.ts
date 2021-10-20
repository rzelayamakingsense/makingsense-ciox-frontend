import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { ModalModule, BsModalService } from "ngx-bootstrap/modal";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { NgxBootstrapIconsModule } from "ngx-bootstrap-icons";
import { pencilSquare, trash, xLg } from "ngx-bootstrap-icons";

import { PatientRoutingModule } from "./patient-routing.module";
import { PatientListComponent } from "./patient-list/patient-list.component";
import { CreatePatientComponent } from "./create-patient/create-patient.component";
import { UpdatePatientComponent } from "./update-patient/update-patient.component";
import { DeletePatientComponent } from "./delete-patient/delete-patient.component";

import { PatientApiService } from "./patient-api.service";

@NgModule({
  declarations: [
    PatientListComponent,

    CreatePatientComponent,
    UpdatePatientComponent,
    DeletePatientComponent,
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    NgxBootstrapIconsModule.pick({ pencilSquare, trash, xLg }),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [PatientApiService, BsModalService],
})
export class PatientModule {}
