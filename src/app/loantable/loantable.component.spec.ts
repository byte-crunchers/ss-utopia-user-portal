import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoantableComponent } from './loantable.component';

describe('LoantableComponent', () => {
  let component: LoantableComponent;
  let fixture: ComponentFixture<LoantableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoantableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoantableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
