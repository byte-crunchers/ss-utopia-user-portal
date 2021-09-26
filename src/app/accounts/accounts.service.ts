import { AccountType } from './account.model';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {

  getAccountTypes (): Observable<AccountType[]>{
    return of([{id: 'Savings Account',
    interest: 2,
    annualFee: 0,
    foodiePoints: 0,
    cashBack: 0,
    lateFee: 0},
    {id: 'Checking Account',
    interest: 1,
    annualFee: 60,
    foodiePoints: 0,
    cashBack: 0,
    lateFee: 0},
    {id: 'Credit Card',
    interest: -29,
    annualFee: 150,
    foodiePoints: 10,
    cashBack: 1,
    lateFee: 30},
    {id: 'Loan',
    interest: -6,
    annualFee: 0,
    foodiePoints: 0,
    cashBack: 0,
    lateFee: 50}]);
  };
}
