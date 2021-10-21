import { Component, OnInit, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { Patient } from '@shared/models/patient';
import { PatientApiService } from '../../patient-api.service';

@Component({
  selector: 'app-patient-delete',
  templateUrl: './patient-delete.component.html',
  styleUrls: ['./patient-delete.component.scss'],
})
export class PatientDeleteComponent implements OnInit {
  patient: Patient = Patient.new();
  event: EventEmitter<any> = new EventEmitter();

  ngOnInit() {}

  delete(patient: Patient) {
    this.service.deletePatient(patient).subscribe(() => {
      this.event.emit('deleted');
      this.bsModalRef.hide();
    });
  }

  onClose() {
    this.bsModalRef.hide();
  }

  constructor(private service: PatientApiService, private bsModalRef: BsModalRef) {}
}
