import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { catchError, map, tap } from 'rxjs/operators';

import { Patient } from '@shared/models/patient';
import { PatientsApi } from '@shared/models/api';
import { throwError } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { SortDirectionEnum } from '@shared/enums/enums';

@Injectable({
  providedIn: 'root',
})
export class PatientApiService {
  readonly url = `${environment.host}${environment.api ? '/' + environment.api : ''}${environment.version ? '/' + environment.version : ''
    }`;

  onError(err: any) {
    this.spinner.hide();
    this.toastr.error(err.message, 'Patients');
    return throwError(err);
  }

  onSuccess(message: string): void {
    this.spinner.hide();
    this.toastr.success(message, 'Patients');
  }

  getPatientList(pageNumber: number, pageSize: number, sortBy: string, sortByDirection: SortDirectionEnum) {

    let params = new HttpParams();

    params = params.append('pageNumber', pageNumber);
    params = params.append('pageSize', pageSize);
    params = params.append('sortBy', sortBy);
    params = params.append('sortByDirection', sortByDirection);
    console.log(sortBy)
    console.log(sortByDirection)
    this.spinner.show();

    return this.http.get<PatientsApi>(this.url + '/patient', { params }).pipe(
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
      catchError((err) => this.onError(err)),
    );
  }

  getPatientAutocomplete(query: string) {

    let params = new HttpParams();

    params = params.append('query', query);
    // TODO: we need autocomplete api method. We are using patient (getAll) method temporarily
    // we need something like: return this.http.get<PatientsApi>(this.url + "/patient/autocomplete", { params })
    return this.http.get<PatientsApi>(this.url + "/patient", { params }).pipe(
      map((data: any) => data.items || []),
      catchError((err) => this.onError(err))
    );
  }

  getPatient(id: number | string) {
    // let params = new HttpParams();

    // params = params.append('pageNumber', pageNumber);
    // params = params.append('pageSize', pageSize);

    id = +id;
    this.spinner.show();

    return this.http.get<PatientsApi>(this.url + '/patient/' + id).pipe(
      // data.pageNumber = item.pageNumber;

      // // data.pageSize = item.pageSize; // TODO: uncomment line -> CIOX-51
      // data.pageSize = pageSize; // TODO: remove line -> CIOX-51

      // // data.totalResults = item.totalResults; // TODO: uncomment line -> CIOX-51
      // data.totalResults = 50; // TODO: remove line -> CIOX-51
      map((item) => Patient.new(item)),
      tap(() => this.spinner.hide()),
      catchError((err) => this.onError(err)),
    );
  }

  createPatient(item: Patient) {
    this.spinner.show();
    return this.http.post(this.url + '/patient', item).pipe(
      map((data) => Patient.new(data)),
      tap(() => this.onSuccess('Patient created successfully')),
      catchError((err) => this.onError(err)),
    );
  }

  updatePatient(item: Patient) {
    this.spinner.show();
    return this.http.put(this.url + '/patient/' + item.id, Patient.transform(item)).pipe(
      map((item) => Patient.new(item)),
      tap(() => this.onSuccess('Patient updated successfully')),
      catchError((err) => this.onError(err)),
    );
  }

  deletePatient(item: Patient) {
    this.spinner.show();
    return this.http.delete(this.url + '/patient/' + item.id).pipe(
      tap(() => this.onSuccess('Patient deleted successfully')),
      catchError((err) => this.onError(err)),
    );
  }

  constructor(private http: HttpClient, private spinner: NgxSpinnerService, private toastr: ToastrService) { }
}
