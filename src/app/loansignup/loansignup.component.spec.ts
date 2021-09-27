import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpService } from 'src/app/shared/services/http.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoanSignupComponent } from './loansignup.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AprPipe } from '../shared/custom/apr.pipe';
import { YesNoPipe } from '../shared/custom/usort.pipe';

describe('LoanSignupComponent', () => {
    let component: LoanSignupComponent;
    let fixture: ComponentFixture<LoanSignupComponent>;
    let service: HttpService;
    let httpSer: HttpClient;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                LoanSignupComponent,
                AprPipe,
                YesNoPipe
            ],
            imports: [
                HttpClientModule,
                HttpClientTestingModule,
                RouterTestingModule,
                FormsModule,
                ReactiveFormsModule
            ],
            providers: [HttpService],

        })
            .compileComponents();
        service = new HttpService(httpSer);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LoanSignupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
