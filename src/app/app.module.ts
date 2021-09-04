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
import { LoanTableComponent } from './loantable/loantable.component';

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
    LoanTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
