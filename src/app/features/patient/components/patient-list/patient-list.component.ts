import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { Patient } from '@shared/models/patient';
import { PatientPageEnum } from '../../enums/patient';
import { PatientApiService } from '../../patient-api.service';

import { PatientDeleteComponent } from '../patient-delete/patient-delete.component';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss'],
})
export class PatientListComponent implements OnInit {
  patients: Patient[] = [];
  pageSize: number = this.route.snapshot.queryParams.pageSize || 20;
  pageNumber: number = this.route.snapshot.queryParams.pageNumber || 1;
  totalResults: number = 0;
  totalPages: number = 0;
  bsModalRef!: BsModalRef;
  pageSizes = [10, 20, 50, 100];

  @Input() page: PatientPageEnum = PatientPageEnum.LIST;

  ngOnInit(): void {
    this.getPatientList();
  }

  getPatientList() {
    this.service
      .getPatientList(this.pageNumber, this.pageSize)
      .pipe(take(1))
      .subscribe((data) => {
        this.patients = data.items;
        this.pageNumber = data.pageNumber;
        this.pageSize = data.pageSize;
        // this.totalResults = data.totalResults; //TODO: uncomment this -> CIOX-51 task
        this.totalResults = 50; //TODO: to be removed -> CIOX-51 task
      });
  }

  new() {
    this.router.navigateByUrl('/patient/new');
  }

  edit(id: number) {
    this.router.navigateByUrl('/patient/edit/' + id);
  }

  view(patient: Patient) {
    this.router.navigateByUrl('/patient/' + patient.id);
  }

  delete(patient: Patient) {
    this.bsModalRef = this.bsModalService.show(PatientDeleteComponent);
    this.bsModalRef.content.patient = patient;
    this.bsModalRef.content.event.subscribe((result: any) => {
      if (result == 'deleted') {
        this.getPatientList();
      }
    });
  }

  pageChanged(event: PageChangedEvent): void {
    this.scrollToTop();
    this.pageNumber = event.page;
    this.router
      .navigate(['patient/list'], {
        queryParams: {
          pageNumber: event.page,
          pageSize: this.route.snapshot.queryParams.pageSize,
        },
      })
      .then(() => {
        this.getPatientList();
      });
  }

  onPageSizeChange() {
    this.scrollToTop();
    this.router
      .navigate(['patient/list'], {
        queryParams: {
          pageNumber: this.route.snapshot.queryParams.pageNumber,
          pageSize: this.pageSize > 100 ? 20 : this.pageSize,
        },
      })
      .then(() => {
        this.getPatientList();
      });
  }

  getTotalPages(event: number) {
    setTimeout(() => {
      this.totalPages = event;
    }, 100);
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }

  constructor(
    private service: PatientApiService,
    private bsModalService: BsModalService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}
}
