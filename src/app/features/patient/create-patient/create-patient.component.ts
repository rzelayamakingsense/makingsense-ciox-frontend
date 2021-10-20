import { Component, OnInit, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { BsModalRef } from "ngx-bootstrap/modal";

import { PatientApiService } from "../patient-api.service";

@Component({
  selector: "app-create-patient",
  templateUrl: "./create-patient.component.html",
  styleUrls: ["./create-patient.component.scss"],
})
export class CreatePatientComponent implements OnInit {
  form!: FormGroup;
  event: EventEmitter<any> = new EventEmitter();
  updating: boolean = false;

  onSubmit() {
    this.updating = true;
    this.service.createPatient(this.form.value)
      .subscribe((data: any) => {
        if (data != null) {
          this.event.emit("created");
          this.bsModalRef.hide();
          setTimeout(() => this.updating = false, 3000);
        }
      });
  }

  onClose() {
    this.bsModalRef.hide();
  }

  ngOnInit() {
    this.form = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
    });
  }

  constructor(
    private fb: FormBuilder,
    private service: PatientApiService,
    private bsModalRef: BsModalRef
  ) { }
}
