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
import { AccountsComponent } from './accounts/accounts.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuardService } from './shared/services/guard.service';
import { CardSignupComponent } from './cardsignup/cardsignup.component';
import { CardApprovedComponent } from './cardapproved/cardapproved.component';
import { LoanSignupComponent } from './loansignup/loansignup.component';
import { LoanApprovedComponent } from './loanapproved/loanapproved.component';
import { ProfileComponent } from './profile/profile.component';
import { PasswordrecoveryComponent } from './passwordrecovery/passwordrecovery.component';
import { AccounttransactionComponent } from './accounttransaction/accounttransaction.component';

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
                path: 'register',
                component: RegisterComponent
            },
            {
                path: 'cards',
                component: CardsComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'cards/table',
                component: CardTableComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'cards/signup',
                component: CardSignupComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'accounts',
                component: AccountsComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'cards/table',
                component: CardTableComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'cards/approved',
                component: CardApprovedComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'loans',
                component: LoansComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'loans/table',
                component: LoanTableComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'loans/signup',
                component: LoanSignupComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'loans/approved',
                component: LoanApprovedComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'investing',
                component: StocksComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'profile',
                component: ProfileComponent,
                canActivate: [AuthGuardService]
            },
            {
                path: 'passwordrecovery',
                component: PasswordrecoveryComponent
            },
            {
                path: 'accounttransaction',
                component: AccounttransactionComponent
            },
            {  //redirect invalid urls to home page
                path: '**',
                redirectTo: ''
            }
        ]
    }
];


@NgModule({
    //when a new page is loaded, auto scroll to top
    imports: [
        RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
