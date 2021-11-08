import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpService } from 'src/app/shared/services/http.service';
import { AccountTransactionService } from './accounttransaction.service';
import { Transaction } from './accounttransaction.model';

@Component({
  selector: 'app-accounttransaction',
  templateUrl: './accounttransaction.component.html',
  styleUrls: ['./accounttransaction.component.css']
})

export class AccounttransactionComponent implements OnInit {

  constructor(
    private accounttransactionService: AccountTransactionService,
    private httpService: HttpService,
  ) { }

  transaction: Transaction[];
  transactions: any;
  filterTerm: string;

  flag = 0;

  ngOnInit(): void {
    // this.accounttransactionService.getTransaction().subscribe((res) => {
    //     this.transaction = res;
    // });
    this.loadAllTransactions();
  }

  page = 1;
  handlePageChange(event:any) {
    this.page = event;
  }

  ReverseOrder(){
    if(this.flag==0){
      this.loadAllTransactionsReverse();
      this.flag = 1;
    }else{
      this.loadAllTransactions();
      this.flag = 0;
    }
  }

  loadAllTransactions() {
      this.httpService.getAll(`http://localhost:8080/transaction`).subscribe((res) => {
          this.transactions = res;
      })
  }

  loadAllTransactionsReverse() {
      this.httpService.getAll(`http://localhost:8080/transaction_reverse`).subscribe((res) => {
          this.transactions = res;
      })
  }

  loadAllTransactionsSearchMemo() {
      this.httpService.getAll(`http://localhost:8080/transaction_like_memo`).subscribe((res) => {
          this.transactions = res;
      })
  }

}
