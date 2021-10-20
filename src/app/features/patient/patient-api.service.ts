// Core
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";

// Models
import { Patient } from "../../shared/models/patient";
import { PatientsApi } from "../../shared/models/api";

@Injectable({
  providedIn: "root",
})
export class PatientApiService {
  readonly url = `${environment.host}${
    environment.api ? "/" + environment.api : ""
  }${environment.version ? "/" + environment.version : ""}`;

  //
  // PATIENT
  //
  getPatients() {
    return this.http
      .get<PatientsApi>(this.url + "/patient", {
        headers: new HttpHeaders({ Prefer: "code=200, dynamic=true" }),
      })
      .pipe(tap((data) => console.log("data => ", data)))
      .pipe(map((item) => PatientsApi.new(item)));
  }

  createPatient(item: Patient) {
    return this.http
      .post(this.url + "/patient", {
        ...Patient.transform(item),
      })
      .pipe(map((data) => Patient.new(data)));
  }

  updatePatient(item: Patient) {
    return this.http
      .put(this.url + "/patient/" + item.id, Patient.transform(item))
      .pipe(map((item) => Patient.new(item)));
  }

  deletePatient(item: Patient) {
    return this.http.delete(this.url + "/patient/" + item.id);
  }

  constructor(private http: HttpClient) {}
}