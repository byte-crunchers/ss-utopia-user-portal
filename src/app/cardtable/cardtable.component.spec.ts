import { LayoutComponent } from '../layout/layout.component';
import { HeaderComponent } from '../layout/header/header.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { CardTableComponent } from './cardtable.component';
import { HttpService } from 'src/app/shared/services/http.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import {
    ComponentFixture,
    TestBed,
} from '@angular/core/testing';
import {
    HttpClientTestingModule,
} from '@angular/common/http/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HighlightDirective } from 'src/app/shared/custom/highlight.directive';


describe('CardTableComponent', () => {
    let component: CardTableComponent;
    let fixture: ComponentFixture<CardTableComponent>;
    let service: HttpService;
    let httpSer: HttpClient;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                CardTableComponent,
                HeaderComponent,
                LayoutComponent,
                FooterComponent,
                HighlightDirective,
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
        component = new CardTableComponent(service);
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

});
