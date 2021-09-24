import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CardsComponent } from './cards/cards.component';
import { LoansComponent } from './loans/loans.component';
import { StocksComponent } from './stocks/stocks.component';
import { CardTableComponent } from './cardtable/cardtable.component';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HttpService } from './shared/services/http.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { YesNoPipe } from './shared/custom/usort.pipe';
import { HighlightDirective } from './shared/custom/highlight.directive';
import { AprPipe } from './shared/custom/apr.pipe';
import { LoanTableComponent } from './loantable/loantable.component';
import { LoginComponent } from './login/login.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CardSignupComponent } from './cardsignup/cardsignup.component';
import { CardApprovedComponent } from './cardapproved/cardapproved.component';
import { LoanSignupComponent } from './loansignup/loansignup.component';
import { LoanApprovedComponent } from './loanapproved/loanapproved.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        CardsComponent,
        LoansComponent,
        StocksComponent,
        CardTableComponent,
        LayoutComponent,
        HeaderComponent,
        FooterComponent,
        YesNoPipe,
        HighlightDirective,
        AprPipe,
        LoanTableComponent,
        LoginComponent,
        CardSignupComponent,
        CardApprovedComponent,
        LoanSignupComponent,
        LoanApprovedComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatProgressSpinnerModule,
        NgbModule
    ],
    providers: [
        HttpService,
        { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
        JwtHelperService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
