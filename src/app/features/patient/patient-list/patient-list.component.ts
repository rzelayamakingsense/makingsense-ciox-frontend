import { Component, OnInit } from "@angular/core";
import { Patient } from "../.../../../../shared/models/patient";
import { Observable, of } from "rxjs";
import { PatientApiService } from "../patient-api.service";
import { tap } from "rxjs/operators";

@Component({
  selector: "app-patient-list",
  templateUrl: "./patient-list.component.html",
  styleUrls: ["./patient-list.component.scss"],
})
export class PatientListComponent implements OnInit {
  // patients$: Observable<any[]> = new Observable<Array<any>>();

  patients: Patient[] = [];
  pageSize: number = 0;
  pageNumber: number = 0;
  totalResults: number = 0;

  ngOnInit(): void {
    this.getPatients();
  }

  getPatients() {
    this.service
      .getPatients()
      .pipe(
        tap(({ items, pageSize, pageNumber, totalResults }) => {
          this.patients = items;
          this.pageSize = pageNumber;
          this.pageNumber = pageNumber;
          this.totalResults = totalResults;
        })
      )
      .subscribe();
  }

  constructor(private service: PatientApiService) {}
}
