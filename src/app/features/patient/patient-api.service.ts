import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { catchError, map, tap } from "rxjs/operators";

import { Patient } from "../../shared/models/patient";
import { PatientsApi } from "../../shared/models/api";
import { throwError } from "rxjs";

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

    return this.http
      .get<PatientsApi>(this.url + "/patient", { params })
      .pipe(map((item) => {
        var data = PatientsApi.new(item);
        data.pageNumber = item.pageNumber;

        // data.pageSize = item.pageSize; // TODO: uncomment line -> CIOX-51
        data.pageSize = pageSize; // TODO: remove line -> CIOX-51

        // data.totalResults = item.totalResults; // TODO: uncomment line -> CIOX-51
        data.totalResults = 50; // TODO: remove line -> CIOX-51

        return data;
      }), catchError(err => {
        alert(err.message);
        return throwError(err);
      }));
  }

  // getPatientList() {
  //   return this.http
  //     .get<PatientsApi>(this.url + "/patient", {
  //       headers: new HttpHeaders({ Prefer: "code=200, dynamic=true" }),
  //     })
  //     .pipe(tap((data) => console.log("data => ", data)))
  //     .pipe(map((item) => PatientsApi.new(item)));
  // }

  createPatient(item: Patient) {
    return this.http.post(this.url + "/patient", item)
      .pipe(map((data) => Patient.new(data)),
        catchError(err => {
          alert(err.message);
          return throwError(err);
        }));
  }

  updatePatient(item: Patient) {
    return this.http.put(this.url + "/patient/" + item.id, Patient.transform(item))
      .pipe(map((item) => Patient.new(item)),
        catchError(err => {
          alert(err.message);
          return throwError(err);
        }));
  }

  deletePatient(item: Patient) {
    return this.http.delete(this.url + "/patient/" + item.id)
      .pipe(
        catchError(err => {
          alert(err.message);
          return throwError(err);
        }));
  }

  constructor(private http: HttpClient) { }
}
