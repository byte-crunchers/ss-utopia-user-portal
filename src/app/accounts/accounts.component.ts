import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { AccountsService } from './accounts.service';
import { AccountType } from './account.model';
import { environment } from 'src/environments/environment';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';

@Component({
    selector: 'app-accounts',
    templateUrl: './accounts.component.html',
    styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

    constructor(
        private modalService: NgbModal,
        private accountsService: AccountsService,
    ) { }

    accounts: AccountType[];
    modalHeader = "";
    modalImage = "";
    modalAccount: AccountType;

    //modal variables
    modalRef!: NgbModalRef;
    errMsg: any;
    closeResult: any;

    ngOnInit(): void {
      this.accountsService.getAccountTypes().subscribe((res) => {
          this.accounts = res;
      });
    }

    closeModal() {
        this.modalRef.close();
    }

    openModal(content: any, account: AccountType) {

        this.modalAccount = account;

        this.modalRef = this.modalService.open(content);
        this.modalRef.result.then(
            (result) => {
                this.errMsg = '';
            },
            (reason) => {
                this.errMsg = 'Unable to serivce';
            }
        );
    }
}
