import { LayoutComponent } from '../layout/layout.component';
import { HeaderComponent } from '../layout/header/header.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { CardTableComponent } from './cardtable.component';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpService } from 'src/app/shared/services/http.service';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, from, of, observable, throwError } from 'rxjs';
import {
  async,
  ComponentFixture,
  TestBed,
  tick,
  fakeAsync,
} from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HighlightDirective } from 'src/app/shared/custom/highlight.directive';
// import { UsortPipe } from 'src/app/shared/custom/usort.pipe';

export class MockNgbModalRef {
  result: Promise<any> = new Promise((resolve, reject) => resolve('x'));
}

describe('CardTableComponent', () => {
  let component: CardTableComponent;
  let fixture: ComponentFixture<CardTableComponent>;
  let service: HttpService;
  let modalService: NgbModal;
  let fb: FormBuilder;
  let mockModalRef: MockNgbModalRef = new MockNgbModalRef();
  let httpSer: HttpClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        CardTableComponent,
        HeaderComponent,
        LayoutComponent,
        FooterComponent,
        HighlightDirective,
        // UsortPipe,
      ],
      imports: [
        NgbModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        HttpClientTestingModule,
      ],
      providers: [HttpService],
    }).compileComponents();
    service = new HttpService(httpSer);
    fb = new FormBuilder();
    modalService = TestBed.get(NgbModal);
    component = new CardTableComponent(service, modalService, fb);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardTableComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('on init load all routes should be called', () => {
    spyOn(component, 'loadAllCards');
    component.ngOnInit();
    expect(component.loadAllCards).toHaveBeenCalled();
  });

  it('should load mock routes', () => {
    const mockCards = [
      {
        id: 1,
        oriAirport: {
          airportCode: 'IAD',
          cityName: 'Dulles - Washington DC',
        },
        desAirport: {
          airportCode: 'DCA',
          cityName: 'DC - Washington DC',
        },
      },
      {
        id: 2,
        oriAirport: {
          airportCode: 'JFK',
          cityName: 'New York- NYC',
        },
        desAirport: {
          airportCode: 'DCA',
          cityName: 'DC - Washington DC',
        },
      },
    ];
    spyOn(service, 'getAll').and.returnValues(of(mockCards));
    component.ngOnInit();
    expect(service).toBeTruthy();
    expect(component.cards).toEqual(mockCards);
    expect(component.cards.length).toEqual(2);
  });

  it('should verify modal window function', () => {
    const mockCard = {
      id: 1,
      oriAirport: {
        airportCode: 'IAD',
        cityName: 'Dulles - Washington DC',
      },
      desAirport: {
        airportCode: 'DCA',
        cityName: 'DC - Washington DC',
      },
    };
    // spyOn(modalService, 'open').and.returnValue(mockModalRef);
  });
});
