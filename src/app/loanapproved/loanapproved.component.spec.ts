import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanapprovedComponent } from './loanapproved.component';

describe('LoanapprovedComponent', () => {
  let component: LoanapprovedComponent;
  let fixture: ComponentFixture<LoanapprovedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanapprovedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanapprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
