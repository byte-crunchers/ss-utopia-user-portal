import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardsComponent } from './cards/cards.component';
import { CardTableComponent } from './cardtable/cardtable.component';
import { StocksComponent } from './stocks/stocks.component';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { LoansComponent } from './loans/loans.component';
import { LoanTableComponent } from './loantable/loantable.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent
        // redirectTo: 'cards',
        // pathMatch: 'full'
      },
      {
        path: 'cards',
        component: CardsComponent
      },
      {
        path: 'loans',
        component: LoansComponent
      },
      {
        path: 'investing',
        component: StocksComponent
      },
      {
        path: 'cards/table',
        component: CardTableComponent
      },
      {
        path: 'loans/table',
        component: LoanTableComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
