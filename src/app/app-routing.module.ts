import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { CardsComponent } from './cards/cards.component';
import { CardTableComponent } from './cardtable/cardtable.component';
import { StocksComponent } from './stocks/stocks.component';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { LoansComponent } from './loans/loans.component';
import { LoanTableComponent } from './loantable/loantable.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './shared/services/guard.service';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                component: HomeComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'cards',
                component: CardsComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'loans',
                component: LoansComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'investing',
                component: StocksComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'cards/table',
                component: CardTableComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'loans/table',
                component: LoanTableComponent,
                canActivate: [AuthGuardService]
            },
            {  //redirect invalid urls to home page
                path: '**',
                redirectTo: ''
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
