import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletePatientComponent } from './patient-delete.component';

describe('DeletePatientComponent', () => {
  let component: DeletePatientComponent;
  let fixture: ComponentFixture<DeletePatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeletePatientComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletePatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
