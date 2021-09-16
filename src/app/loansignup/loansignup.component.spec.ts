import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoansignupComponent } from './loansignup.component';

describe('LoansignupComponent', () => {
  let component: LoansignupComponent;
  let fixture: ComponentFixture<LoansignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoansignupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoansignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
