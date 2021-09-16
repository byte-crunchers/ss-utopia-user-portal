import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardapprovedComponent } from './cardapproved.component';

describe('CardapprovedComponent', () => {
  let component: CardapprovedComponent;
  let fixture: ComponentFixture<CardapprovedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardapprovedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardapprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
