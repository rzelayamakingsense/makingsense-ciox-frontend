import { Component, OnInit } from "@angular/core";
import { Patient } from "../.../../../../shared/models/patient";
import { PatientApiService } from "../patient-api.service";
import { tap } from "rxjs/operators";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { CreatePatientComponent } from "../create-patient/create-patient.component";
import { UpdatePatientComponent } from "../update-patient/update-patient.component";
import { DeletePatientComponent } from "../delete-patient/delete-patient.component";

@Component({
  selector: "app-patient-list",
  templateUrl: "./patient-list.component.html",
  styleUrls: ["./patient-list.component.scss"],
})
export class PatientListComponent implements OnInit {
  patients: Patient[] = [];
  pageSize: number = 0;
  pageNumber: number = 0;
  totalResults: number = 0;

  bsModalRef!: BsModalRef;

  ngOnInit(): void {
    this.getPatientList();
  }

  getPatientList() {
    this.service
      .getPatientList()
      .pipe(
        tap(({ items, pageSize, pageNumber, totalResults }) => {
          this.patients = items;
          this.pageSize = pageSize;
          this.pageNumber = pageNumber;
          this.totalResults = totalResults;
        })
      )
      .subscribe();
  }

  create() {
    this.bsModalRef = this.bsModalService.show(CreatePatientComponent);
    this.bsModalRef.content.event.subscribe((result: any) => {
      if (result == "created") {
        this.getPatientList();
      }
    });
  }

  update(patient: Patient) {
    this.bsModalRef = this.bsModalService.show(UpdatePatientComponent);
    this.bsModalRef.content.patient = patient;
    this.bsModalRef.content.event.subscribe((result: any) => {
      if (result == "updated") {
        this.getPatientList();
      }
    });
  }

  delete(patient: Patient) {
    this.bsModalRef = this.bsModalService.show(DeletePatientComponent);
    this.bsModalRef.content.patient = patient;
    this.bsModalRef.content.event.subscribe((result: any) => {
      if (result == "deleted") {
        this.getPatientList();
      }
    });
  }

  constructor(
    private service: PatientApiService,
    private bsModalService: BsModalService
  ) {}
}
