import { Component, Input, OnInit } from '@angular/core';
import { GetEnumByIndex } from 'src/app/helpers/utils';
import { Patient } from '../../../../shared/models/patient';
import { PatientGenderEnum } from '../../enums/patient';

@Component({
  selector: 'app-patient-user-info',
  templateUrl: './patient-user-info.component.html',
  styleUrls: ['./patient-user-info.component.scss']
})
export class PatientUserInfoComponent implements OnInit {

  _patient: Patient = Patient.new();

  @Input('patient')
  set patient(value: Patient) {
    this._patient = value;
  }
  
  get patient() {
    return this._patient;
  }

  get gender() {
    return GetEnumByIndex(PatientGenderEnum, this.patient.gender)
  }

  ngOnInit(): void {
  }

  constructor() { }
}
