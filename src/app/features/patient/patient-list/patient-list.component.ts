import { Component, OnInit } from "@angular/core";
import { Patient } from "../.../../../../shared/models/patient";
import { PatientApiService } from "../patient-api.service";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { CreatePatientComponent } from "../create-patient/create-patient.component";
import { UpdatePatientComponent } from "../update-patient/update-patient.component";
import { DeletePatientComponent } from "../delete-patient/delete-patient.component";
import { ActivatedRoute, Router } from "@angular/router";
import { PageChangedEvent } from "ngx-bootstrap/pagination";

@Component({
  selector: "app-patient-list",
  templateUrl: "./patient-list.component.html",
  styleUrls: ["./patient-list.component.scss"],
})
export class PatientListComponent implements OnInit {
  patients: Patient[] = [];
  pageSize: number = this.route.snapshot.queryParams.pageSize || 20;
  pageNumber: number = this.route.snapshot.queryParams.pageNumber || 1;
  totalResults: number = 0;
  totalPages: number = 0;
  bsModalRef!: BsModalRef;
  pageSizes = [10, 20, 50, 100];

  ngOnInit(): void {
    this.getPatientList();
  }

  getPatientList() {
    this.service
      .getPatientList(this.pageNumber, this.pageSize)
      .subscribe(data => {
        this.patients = data.items;
        this.pageNumber = data.pageNumber;
        this.pageSize = data.pageSize;
        // this.totalResults = data.totalResults; //TODO: uncomment this -> CIOX-51 task
        this.totalResults = 50; //TODO: to be removed -> CIOX-51 task
      });
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

  pageChanged(event: PageChangedEvent): void {
    this.scrollToTop();
    this.pageNumber = event.page;
    this.router.navigate(["patient/list"],
      {
        queryParams: {
          pageNumber: event.page,
          pageSize: this.route.snapshot.queryParams.pageSize
        }
      }).then(() => {
        this.getPatientList();
      });
  }

  onPageSizeChange() {
    this.scrollToTop();
    this.router.navigate(["patient/list"],
      {
        queryParams: {
          pageNumber: this.route.snapshot.queryParams.pageNumber,
          pageSize: this.pageSize > 100 ? 20 : this.pageSize
        }
      }).then(() => {
        this.getPatientList();
      });
  }

  getTotalPages(event: number) {
    setTimeout(() => {
      this.totalPages = event;
    }, 100);
  }
  scrollToTop() {
    window.scrollTo(0, 0);
  }

  constructor(
    private service: PatientApiService,
    private bsModalService: BsModalService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
}
