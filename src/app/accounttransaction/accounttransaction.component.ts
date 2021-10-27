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
  ) { }

  transaction: Transaction[];

  ngOnInit(): void {
    this.accounttransactionService.getTransaction().subscribe((res) => {
        this.transaction = res;
    });
  }

}
