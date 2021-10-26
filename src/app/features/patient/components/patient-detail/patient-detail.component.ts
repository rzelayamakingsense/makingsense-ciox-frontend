import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from '@shared/models/patient';
import { catchError, take, tap } from 'rxjs/operators';
import { PatientGenderEnum, PatientPageEnum } from '../../enums/patient';
import { PatientApiService } from '../../patient-api.service';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styleUrls: ['./patient-detail.component.scss'],
})
export class PatientDetailComponent implements OnInit {
  form!: FormGroup;

  patient: Patient = new Patient();

  updating: boolean = false;
  isActiveDisabled: boolean = false;

  _page: PatientPageEnum = PatientPageEnum.VIEW;

  onSubmit(): void {
    this.updating = true;

    if (this.page == PatientPageEnum.NEW) {
      this.create(this.form.value)
        .pipe(take(1))
        .pipe(
          catchError((): any => {
            this.updating = false;
          }),
        )
        .subscribe(() => {
          this.updating = false;
          this.router.navigateByUrl('/patient');
        });
    } else if (this.page == PatientPageEnum.EDIT) {
      this.update(this.form.value)
        .pipe(take(1))
        .subscribe(() => {
          this.updating = false;
          this.router.navigateByUrl('/patient');
        });
    } else {
      return;
    }
  }

  create(value: Patient) {
    return this.service.createPatient(value);
  }

  update(value: Patient) {
    return this.service.updatePatient(value);
  }

  edit() {
    this.router.navigateByUrl('/patient/edit/' + this.patient.id);
  }

  back() {
    this.router.navigateByUrl('/patient');
  }

  @Input()
  set page(page: PatientPageEnum) {
    this._page = page;
    if (page === PatientPageEnum.NEW) return;

    this.service
      .getPatient(this.route.snapshot.params.id)
      .pipe(
        take(1),
        tap((patient) => (this.patient = patient)),
      )
      .subscribe((patient) => this.form.patchValue(patient));
  }

  get page() {
    return this._page;
  }

  get PatientGender() {
    return PatientGenderEnum;
  }

  get isEditable() {
    return this.page == PatientPageEnum.EDIT;
  }

  get isReadonly() {
    return this.page === PatientPageEnum.VIEW;
  }

  get isNew() {
    return this.page === PatientPageEnum.NEW;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      isActive: [false],
      birthDate: [''],
      gender: [''],
    });
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private service: PatientApiService,
    private route: ActivatedRoute,
  ) {}
}
