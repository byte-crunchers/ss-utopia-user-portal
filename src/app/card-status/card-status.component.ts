import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DecimalPipe } from '@angular/common';
import { Last4Pipe } from '../shared/custom/last4.pipe';
import { Router } from '@angular/router';

@Component({
    selector: 'app-card-status',
    templateUrl: './card-status.component.html',
    styleUrls: ['./card-status.component.css']
})
export class CardStatusComponent implements OnInit {

    constructor(
        public authService: AuthService,
        private httpService: HttpService,
        private modalService: NgbModal,
        private fb: FormBuilder,
        private decimalPipe: DecimalPipe,
        private last4Pipe: Last4Pipe,
        public router: Router
    ) { }

    accounts: any;
    cards: any;
    totalCards = 0;
    today = new Date();

    //modal variables
    modalRef!: NgbModalRef;
    errMsg: any;
    closeResult: any;
    modalHeader = "";
    modalImage = "";
    modalInfo: any;
    showSpinner = false;
    options: any  //payment account choices
    selectedCardBalance: any;
    selectedAccountBalance: any;
    minPayment = 25;
    
    //define form field validators
    paymentForm = this.fb.group({
        destinationId: [''],  //hidden field
        originId: ['', Validators.required],
        amount: ['', [Validators.required, Validators.pattern(/^[\d\.]+$/)]],
    });
    
    //display error message if the field has been touched & fails validator checks
    showError(field: string): boolean {
        let x = this.paymentForm.get(field);
        if (x && x.invalid && (x.dirty || x.touched))
            return true;
        return false;
    }

    ngOnInit(): void {
        this.loadAllCards();
        this.loadAllAccounts();
    }

    //set choices for payment account
    setAccountOptions() {
        this.options = new Array(this.accounts.length);

        for (let i = 0; i < this.accounts.length; i++) {
            let a = this.accounts[i];

            this.options[i] = {
                value: a.accountId, text: a.accountType + " - Balance $" + this.decimalPipe.transform(a.balance, '1.2-2')
            };
        }

        this.selectedAccountBalance = this.accounts[0].balance;
        console.log("Account balance = " + this.selectedAccountBalance);
    }

    //get accounts by user ID
    loadAllAccounts() {
        this.httpService.getAll(`${environment.CARDS_URL}` + '/debit/' + this.authService.userId).subscribe((res) => {
            this.accounts = res;
        })
    }

    //get cards by user ID
    loadAllCards() {
        this.httpService.getAll(`${environment.CARDS_URL}` + '/credit/' + this.authService.userId).subscribe((res) => {
            this.cards = res;
            this.totalCards = this.cards.length;
            this.setStatuses();
        })
    }
    
    //set values that are calculated on the front end
    setStatuses() {
        for (let i = 0; i < this.cards.length; i++) {
            this.cards[i].index = i;
            this.cards[i].image = this.cards[i].accountType.toLowerCase().replace(" ", "_") + ".png";

            //set status text & icon
            if (!this.cards[i].approved){
                this.cards[i].statusTxt = "Awaiting approval";
                this.cards[i].icon = -1;
            }
            else if (!this.cards[i].confirmed){
                this.cards[i].statusTxt = "Awaiting confirmation";
                this.cards[i].icon = -1;
            }
            else if (!this.cards[i].active){
                this.cards[i].statusTxt = "Deactivated";
                this.cards[i].icon = -2;
            }
            else{
                this.cards[i].statusTxt = "Active";

                if(this.cards[i].paymentDue > 0)
                    this.cards[i].icon = 1;
                else
                    this.cards[i].icon = 0;
            }
            
        }

    }

    closeModal() {
        this.modalRef.close();
    }

    openPaymentModal(content: any, i: any) {
        this.modalHeader = this.cards[i].accountType + " - " + this.last4Pipe.transform(this.cards[i].cardNum);
        this.modalImage = this.cards[i].image;

        this.modalInfo = [];
        this.modalInfo[0] = this.cards[i].balance;
        this.selectedCardBalance = this.cards[i].balance;
        this.modalInfo[1] = this.cards[i].paymentDue;
        this.modalInfo[2] = this.cards[i].dueDate;

        this.modalRef = this.modalService.open(content);
        this.modalRef.result.then(
            (result) => {
                this.errMsg = '';
            },
            (reason) => {
                this.errMsg = 'Unable to serivce';
            }
        );

        //autofill input fields
        this.setAccountOptions();
        this.paymentForm.patchValue({ originId: this.accounts[0].accountId });

        this.paymentForm.patchValue({ destinationId: this.cards[i].accountId });
        let p = this.decimalPipe.transform(this.cards[i].paymentDue, '1.2-2');
        if (p)
            this.paymentForm.patchValue({ amount: p.replace(',', '') });
    }

    openReportModal(content: any, i: any) {
        this.modalHeader = this.cards[i].accountType + " - " + this.last4Pipe.transform(this.cards[i].cardNum);
        this.modalImage = this.cards[i].accountType.toLowerCase().replace(" ", "_") + ".png";

        this.modalInfo = [];
        this.modalInfo[0] = this.cards[i].accountId;

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
    
    //changed account selection dropdown
    onChange(event: any) {
        for (let i = 0; i < this.accounts.length; i++) {
            if (this.accounts[i].accountId == event.target.value) {
                this.selectedAccountBalance = this.accounts[i].balance;
                console.log("Account balance = " + this.selectedAccountBalance);
            }
        }
    }

    //submit card payment
    submitPayment(fields: any) {

        //check minimum payment amount
        if(fields.amount < this.minPayment) {
            alert('Payment amount must be at least the minimum payment.');
            return;
        }

        //check maximum payment amount
        if(fields.amount > this.selectedCardBalance) {
            alert('Payment amount cannot be greater than the card balance.');
            return;
        }

        console.log('Submitting card payment...');
        this.showSpinner = true;

        //update account balance, update card balance, & save payment
        this.httpService.postForm(`${environment.ACCOUNTS_URL}` + '/cardpayment', fields).subscribe(
            (response: any) => {
                console.log("Payment submitted successfully!");
                this.modalRef.close();
                this.router.navigateByUrl('/cards/paid');

            }, error => {
                if (error.status == 422) {
                    alert('Cannot process payment - Insufficient funds');
                    this.showSpinner = false;
                }
                else {
                    console.log("Form submit failed - Status " + error.status);
                }
            }
        );

    }

    //submit report card as stolen
    submitReport(id: any) {
        
        let json = {
            "accountId": id
        };

        //deactivate card account
        this.httpService.postForm(`${environment.CARDS_URL}` + '/report', json).subscribe(
            (response: any) => {
                console.log("Account deactivated!");
                this.modalRef.close();
                this.loadAllCards();
            }, error => {
                console.log("Form submit failed - Status " + error.status);
            }
        );
    }
    
    //enable submit button when all fields are valid
    enableSubmit(): boolean {
        return this.paymentForm.valid;
    }

    //enable pay button only when status is active & balance isn't 0
    enablePay(i: any): boolean {
        return this.cards[i].statusTxt == "Active" && this.cards[i].balance > 0;
    }

    //enable report stolen button only when status is active
    enableReport(i: any): boolean {
        return this.cards[i].statusTxt == "Active";
    }
    
    
}
