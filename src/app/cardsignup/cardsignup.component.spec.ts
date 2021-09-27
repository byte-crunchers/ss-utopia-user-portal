import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpService } from 'src/app/shared/services/http.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CardSignupComponent } from './cardsignup.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('CardSignupComponent', () => {
    let component: CardSignupComponent;
    let fixture: ComponentFixture<CardSignupComponent>;
    let service: HttpService;
    let httpSer: HttpClient;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CardSignupComponent],
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
        fixture = TestBed.createComponent(CardSignupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
