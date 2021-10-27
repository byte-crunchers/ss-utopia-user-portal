import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccounttransactionComponent } from './accounttransaction.component';

describe('AccounttransactionComponent', () => {
  let component: AccounttransactionComponent;
  let fixture: ComponentFixture<AccounttransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccounttransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccounttransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
