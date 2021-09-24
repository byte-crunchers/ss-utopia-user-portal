import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardApprovedComponent } from './cardapproved.component';

describe('CardApprovedComponent', () => {
  let component: CardApprovedComponent;
  let fixture: ComponentFixture<CardApprovedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardApprovedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
