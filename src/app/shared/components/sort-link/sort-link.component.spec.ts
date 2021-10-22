import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortLinkComponent } from './sort-link.component';

describe('SortLinkComponent', () => {
  let component: SortLinkComponent;
  let fixture: ComponentFixture<SortLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SortLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SortLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
