import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpService } from 'src/app/shared/services/http.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoansComponent } from './loans.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AprPipe } from '../shared/custom/apr.pipe';
import { YesNoPipe } from '../shared/custom/usort.pipe';

describe('LoansComponent', () => {
    let component: LoansComponent;
    let fixture: ComponentFixture<LoansComponent>;
    let service: HttpService;
    let httpSer: HttpClient;
    let modalService: NgbModal;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                LoansComponent,
                AprPipe,
                YesNoPipe
            ],
            imports: [
                HttpClientModule,
                HttpClientTestingModule,
            ],
            providers: [HttpService],
        })
            .compileComponents();
        service = new HttpService(httpSer);
        modalService = TestBed.get(NgbModal);
        component = new LoansComponent(service, modalService);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LoansComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
