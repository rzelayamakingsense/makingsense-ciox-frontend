import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientPageEnum } from '../../enums/patient';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss'],
})
export class PatientComponent implements OnInit {
  page: PatientPageEnum = PatientPageEnum.LIST;

  ngOnInit(): void {
    this.page = this.route.snapshot.data.page;
  }

  get isPageList() {
    return this.page == PatientPageEnum.LIST;
  }

  get isPageDetail() {
    return this.page == PatientPageEnum.NEW || this.page == PatientPageEnum.EDIT || this.page == PatientPageEnum.VIEW;
  }

  constructor(private route: ActivatedRoute, private router: Router) {}
}
