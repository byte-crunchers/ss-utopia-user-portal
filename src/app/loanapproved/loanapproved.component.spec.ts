import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanApprovedComponent } from './loanapproved.component';

describe('LoanApprovedComponent', () => {
  let component: LoanApprovedComponent;
  let fixture: ComponentFixture<LoanApprovedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanApprovedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
