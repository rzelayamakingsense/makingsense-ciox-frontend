import { Component, OnInit, EventEmitter, Input } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { BsModalRef } from "ngx-bootstrap/modal";
import { Patient } from "src/app/shared/models/patient";
import { PatientGenderEnum } from "../enums/patient";

import { PatientApiService } from "../patient-api.service";

@Component({
  selector: "app-update-patient",
  templateUrl: "./update-patient.component.html",
  styleUrls: ["./update-patient.component.scss"],
})
export class UpdatePatientComponent implements OnInit {
  event: EventEmitter<any> = new EventEmitter();
  form!: FormGroup;
  _patient: Patient = new Patient();
  updating: boolean = false;

  ngOnInit() {
    this.form = this.fb.group({
      id: ["", Validators.required],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      isActive: [false],
      birthdate: ["", Validators.required],
      gender: []
    });
  }

  @Input("patient")
  set patient(value: Patient) {
    this.form.get("id")?.setValue(value.id);
    this.form.get("firstName")?.setValue(value.firstName);
    this.form.get("lastName")?.setValue(value.lastName);
    this.form.get("isActive")?.setValue(value.isActive);
    this.form.get("birthdate")?.setValue(value.birthDate);
    this.form.get("gender")?.setValue(value.gender);
  }

  get patient() {
    return this._patient;
  }

  onSubmit() {
    this.updating = true;
    this.service.updatePatient(this.form.value).subscribe(() => {
      this.event.emit("updated");
      this.bsModalRef.hide();
      setTimeout(() => this.updating = false, 3000);
    });
  }

  onClose() {
    this.bsModalRef.hide();
  }

  get PatientGender() {
    return PatientGenderEnum
  }

  constructor(
    private fb: FormBuilder,
    private service: PatientApiService,
    private bsModalRef: BsModalRef
  ) { }
}
