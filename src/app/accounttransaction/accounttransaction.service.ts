import { Transaction } from './accounttransaction.model';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountTransactionService {

  getTransaction (): Observable<Transaction[]>{
    return of([
    {id: 1, date: "10/1/21", memo: "Paycheck", value: 1000, balance: 1000},
    {id: 2, date: "10/2/21", memo: "Costco Fuel", value: -36, balance: 964},
    {id: 3, date: "10/3/21", memo: "Cinemark Movie Club", value: -9.99, balance: 954.01},
    {id: 4, date: "10/4/21", memo: "Venmo Cashout", value: 28.92, balance: 982.93},
    {id: 5, date: "10/5/21", memo: "Bob's Burgers", value: -13.74, balance: 969.19},
    {id: 6, date: "10/6/21", memo: "GameStop", value: -58.17, balance: 911.02},
    {id: 7, date: "10/7/21", memo: "Checking 21453", value: 200.00, balance: 1111.02},
    {id: 8, date: "10/8/21", memo: "Costco", value: -78.23, balance: 1032.79},
    {id: 9, date: "10/9/21", memo: "PG&E", value: -486.15, balance: 546.64},
    {id: 10, date: "10/10/21", memo: "SJ Water", value: -311.76, balance: 234.88},
    {id: 11, date: "10/11/21", memo: "Amazon", value: -58.32, balance: 176.56},
    {id: 12, date: "10/12/21", memo: "Netflix", value: -14.99, balance: 161.57},
    {id: 13, date: "10/13/21", memo: "Comcast", value: -70.00, balance: 91.57},
    {id: 14, date: "10/14/21", memo: "Paycheck", value: 1000.00, balance: 1091.57},
    {id: 15, date: "10/15/21", memo: "ATM Cashout", value: -50.00, balance: 1041.57},
    {id: 16, date: "10/16/21", memo: "Pete's Coffee", value: -4.75, balance: 1036.82},
    {id: 17, date: "10/17/21", memo: "Ebay", value: -218.73, balance: 818.09},
    {id: 18, date: "10/18/21", memo: "Lottery Winnings", value: 2300000, balance: 2300818.09},
    {id: 19, date: "10/19/21", memo: "MasterCraft Boating", value: -40000.00, balance: 2260818.09},
    {id: 20, date: "10/20/21", memo: "Corvette World", value: -80000, balance: 2180818.09},
    {id: 21, date: "10/21/21", memo: "Bitcoin", value: -2180818.09, balance: 0.00},
    ]);
  };
}
