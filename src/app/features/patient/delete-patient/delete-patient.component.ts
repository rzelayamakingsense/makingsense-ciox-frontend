import { Component, OnInit, EventEmitter } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";
import { Patient } from "src/app/shared/models/patient";
import { PatientApiService } from "../patient-api.service";
// import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: "app-delete-patient",
  templateUrl: "./delete-patient.component.html",
  styleUrls: ["./delete-patient.component.scss"],
})
export class DeletePatientComponent implements OnInit {
  patient: Patient = Patient.new();
  event: EventEmitter<any> = new EventEmitter();

  ngOnInit() {}

  deletePatient(patient: Patient) {
    this.service.deletePatient(patient).subscribe(() => {
      this.event.emit("deleted");
      this.bsModalRef.hide();
    });
  }

  onClose() {
    this.bsModalRef.hide();
  }

  constructor(
    private service: PatientApiService,
    private bsModalRef: BsModalRef
  ) {}
}
