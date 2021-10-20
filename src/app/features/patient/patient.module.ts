import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { PatientRoutingModule } from "./patient-routing.module";
import { PatientListComponent } from "./patient-list/patient-list.component";
import { PatientApiService } from "./patient-api.service";

@NgModule({
  declarations: [PatientListComponent],
  imports: [CommonModule, PatientRoutingModule],
  providers: [PatientApiService],
})
export class PatientModule {}
