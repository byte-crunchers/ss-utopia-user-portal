import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpService } from 'src/app/shared/services/http.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CardsComponent } from './cards.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

describe('CardsComponent', () => {
    let component: CardsComponent;
    let fixture: ComponentFixture<CardsComponent>;
    let service: HttpService;
    let httpSer: HttpClient;
    let modalService: NgbModal;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CardsComponent],
            imports: [
                HttpClientModule,
                HttpClientTestingModule,
            ],
            providers: [HttpService],
        })
            .compileComponents();
        service = new HttpService(httpSer);
        modalService = TestBed.get(NgbModal);
        component = new CardsComponent(service, modalService);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CardsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
