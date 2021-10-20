import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { catchError, map, tap } from "rxjs/operators";

import { Patient } from "../../shared/models/patient";
import { PatientsApi } from "../../shared/models/api";
import { throwError } from "rxjs";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: "root",
})
export class PatientApiService {
  readonly url = `${environment.host}${environment.api ? "/" + environment.api : ""
    }${environment.version ? "/" + environment.version : ""}`;

  getPatientList(pageNumber: number, pageSize: number) {

    let params = new HttpParams();

    params = params.append('pageNumber', pageNumber);
    params = params.append('pageSize', pageSize);

    this.spinner.show();

    return this.http
      .get<PatientsApi>(this.url + "/patient", { params })
      .pipe(
        map((item) => {
          var data = PatientsApi.new(item);

          data.pageNumber = item.pageNumber;

          // data.pageSize = item.pageSize; // TODO: uncomment line -> CIOX-51
          data.pageSize = pageSize; // TODO: remove line -> CIOX-51

          // data.totalResults = item.totalResults; // TODO: uncomment line -> CIOX-51
          data.totalResults = 50; // TODO: remove line -> CIOX-51

          return data;
        }),
        tap(() => this.spinner.hide()),
        catchError(err => {
          this.spinner.hide();
          this.toastr.error(err.message, "Patients");
          return throwError(err);
        }));
  }

  getPatient(patient: Patient) {

    // let params = new HttpParams();

    // params = params.append('pageNumber', pageNumber);
    // params = params.append('pageSize', pageSize);

    this.spinner.show();

    return this.http
      .get<PatientsApi>(this.url + "/patient/" + patient.id)
      .pipe(
        map((item) => {
          var data = Patient.new(item);

          // data.pageNumber = item.pageNumber;

          // // data.pageSize = item.pageSize; // TODO: uncomment line -> CIOX-51
          // data.pageSize = pageSize; // TODO: remove line -> CIOX-51

          // // data.totalResults = item.totalResults; // TODO: uncomment line -> CIOX-51
          // data.totalResults = 50; // TODO: remove line -> CIOX-51

          return data;
        }),
        tap(() => this.spinner.hide()),
        catchError(err => {
          this.spinner.hide();
          this.toastr.error(err.message, "Patient");
          return throwError(err);
        }));
  }

  createPatient(item: Patient) {
    this.spinner.show();
    return this.http.post(this.url + "/patient", item)
      .pipe(
        map((data) => Patient.new(data)),
        tap(() => {
          this.spinner.hide();
          this.toastr.success("Patient created successfully", "Patients");
        }),
        catchError(err => {
          this.spinner.hide();
          this.toastr.error(err.message, "Patients");
          return throwError(err);
        }));
  }

  updatePatient(item: Patient) {
    this.spinner.show();
    return this.http.put(this.url + "/patient/" + item.id, Patient.transform(item))
      .pipe(
        map((item) => Patient.new(item)),
        tap(() => {
          this.spinner.hide();
          this.toastr.success("Patient updated successfully", "Patients");
        }),
        catchError(err => {
          this.spinner.hide();
          this.toastr.error(err.message, "Patients");
          return throwError(err);
        }));
  }

  deletePatient(item: Patient) {
    this.spinner.show();
    return this.http.delete(this.url + "/patient/" + item.id)
      .pipe(
        tap(() => {
          this.spinner.hide();
          this.toastr.success("Patient deleted successfully", "Patients");
        }),
        catchError(err => {
          this.spinner.hide();
          this.toastr.error(err.message, "Patients");
          return throwError(err);
        }));
  }

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) { }
}
