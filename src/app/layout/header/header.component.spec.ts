import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from 'src/app/shared/services/auth.service';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    let authService: AuthService;
    let http: HttpClient;
    let jwtHelper: JwtHelperService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [HeaderComponent],
            imports: [
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
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
