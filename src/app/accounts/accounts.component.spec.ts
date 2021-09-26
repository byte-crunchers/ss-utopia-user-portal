import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AccountsComponent', () => {
    let component: AccountsComponent;
    let fixture: ComponentFixture<AccountsComponent>;
    let authService: AuthService;
    let http: HttpClient;
    let jwtHelper: JwtHelperService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AccountsComponent],
            imports: [
                FormsModule,
                ReactiveFormsModule,
                HttpClientModule,
                HttpClientTestingModule,
                RouterTestingModule
            ],
            providers: [
                { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
                JwtHelperService
            ],
        })
            .compileComponents();
        jwtHelper = new JwtHelperService();
        authService = new AuthService(http, jwtHelper);
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(AccountsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
