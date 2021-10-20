import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientUserInfoComponent } from './patient-user-info.component';

describe('PatientUserInfoComponent', () => {
  let component: PatientUserInfoComponent;
  let fixture: ComponentFixture<PatientUserInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientUserInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientUserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
