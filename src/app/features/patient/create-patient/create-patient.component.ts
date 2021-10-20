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

  onSubmit() {
    this.service.createPatient(this.form.value).subscribe((data: any) => {
      console.log(data);
      if (data != null && data > 0) {
        this.event.emit("created");
        this.bsModalRef.hide();
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
  ) {}
}
