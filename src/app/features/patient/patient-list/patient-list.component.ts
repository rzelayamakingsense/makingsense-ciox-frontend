import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {

  patients$: Observable<any[]> = new Observable<Array<any>>();

  constructor() { }

  ngOnInit(): void {
    this.getPatients();
  }

  getPatients() {

    this.patients$ = of([
      {
        "patientId": "0f76f8e3-45e1-49be-babc-895258b1c570",
        "firstName": "Eleonor",
        "lastName": "Cohen"
      },
      {
        "patientId": "ca351b6d-bff3-4ac5-b034-f0b5e3b71d9a",
        "firstName": "Caroline",
        "lastName": "Koch"
      },
      {
        "patientId": "71dd10da-6a73-4083-a46c-85abc0c36a2a",
        "firstName": "Eleonor",
        "lastName": "Best"
      }
    ]);

  }

}
