import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { environment } from 'src/environments/environment';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-loan-status',
    templateUrl: './loan-status.component.html',
    styleUrls: ['./loan-status.component.css']
})
export class LoanStatusComponent implements OnInit {

    constructor(
        public authService: AuthService,
        private httpService: HttpService,
        private modalService: NgbModal,
        private fb: FormBuilder,
        private decimalPipe: DecimalPipe,
        public router: Router
    ) { }

    payments: any;
    totalPayments = 0;
    accounts: any;
    loans: any;
    totalLoans = 0;
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
    selectedBalance: any;
    minPayment = 25;

    //define form field validators
    paymentForm = this.fb.group({
        destinationId: [''],
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
        this.loadAllLoans();
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

        this.selectedBalance = this.accounts[0].balance;
        console.log("Account balance = " + this.selectedBalance);
    }

    //get all payments for 1 loan
    loadPayments(loanId: number, balance: number) {
        this.payments = [];  //empty the array while it's loading
        this.showSpinner = true;

        this.httpService.getAll(`${environment.LOANS_URL}` + '/payments/' + loanId).subscribe((res) => {
            this.showSpinner = false;
            if(res == null) {  
                //no payments exist
                this.totalPayments = 0;
            }
            else {  
                //loan has some existing payments
                this.payments = res;
                this.totalPayments = this.payments.length;

                //retroactively fill in the 'remaining balance' column
                let b = -balance;
                for(let i=this.payments.length-1; i>=0; i--) {
                    this.payments[i].balance = b;
                    b += this.payments[i].amount;
                }

            }
        }, error => {
            console.log("Could not get payments - Status " + error.status);
        });
    }

    //get accounts by user ID
    loadAllAccounts() {
        this.httpService.getAll(`${environment.CARDS_URL}` + '/debit/' + this.authService.userId).subscribe((res) => {
            this.accounts = res;
        })
    }

    //get loans by user ID
    loadAllLoans() {
        this.httpService.getAll(`${environment.LOANS_URL}` + '/myloans/' + this.authService.userId).subscribe((res) => {
            this.loans = res;
            this.totalLoans = this.loans.length;
            this.setStatuses();
        })
    }

    //set values that are calculated on the front end
    setStatuses() {
        for (let i = 0; i < this.loans.length; i++) {
            this.loans[i].index = i;
            this.loans[i].image = this.loans[i].loanType.toLowerCase().replace(" ", "_") + "_loan.jpg";

            //set status text & icon
            if (!this.loans[i].approved) {
                this.loans[i].statusTxt = "Awaiting approval";
                this.loans[i].icon = -1;
            }
            else if (!this.loans[i].confirmed) {
                this.loans[i].statusTxt = "Awaiting confirmation";
                this.loans[i].icon = -1;
            }
            else if (this.loans[i].balance == 0) {
                this.loans[i].statusTxt = "Paid in full";
                this.loans[i].icon = 0;
            }
            else {
                this.loans[i].statusTxt = "Active";

                if (this.loans[i].paymentDue > 0)
                    this.loans[i].icon = 1;
                else
                    this.loans[i].icon = 0;
            }

        }

    }

    closeModal() {
        this.modalRef.close();
    }

    openPaymentModal(content: any, i: any) {
        this.modalHeader = this.loans[i].loanType + " Loan";
        this.modalImage = this.loans[i].loanType.toLowerCase().replace(" ", "_") + "_loan.jpg";

        this.modalInfo = [];
        this.modalInfo[0] = -this.loans[i].balance;
        this.modalInfo[1] = this.loans[i].paymentDue;
        this.modalInfo[2] = this.loans[i].dueDate;

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

        this.paymentForm.patchValue({ destinationId: this.loans[i].loanId });
        let p = this.decimalPipe.transform(this.loans[i].paymentDue, '1.2-2');
        if (p)
            this.paymentForm.patchValue({ amount: p.replace(',', '') });
    }

    openHistoryModal(content: any, i: any) {
        this.loadPayments(this.loans[i].loanId, this.loans[i].balance);

        this.modalHeader = this.loans[i].loanType + " Loan";
        this.modalImage = this.loans[i].loanType.toLowerCase().replace(" ", "_") + "_loan.jpg";
        
        this.modalInfo = [];

        this.modalRef = this.modalService.open(content, { windowClass : "myCustomModalClass"});
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
                this.selectedBalance = this.accounts[i].balance;
                console.log("Account balance = " + this.selectedBalance);
            }
        }
    }

    //submit payment button
    submit(fields: any) {

        //check minimum payment amount
        if(fields.amount < this.minPayment)
        {
            alert('Amount must be at least the minimum payment.');
            return;
        }

        console.log('Submitting loan payment...');
        this.showSpinner = true;

        //update account balance
        this.httpService.postForm(`${environment.ACCOUNTS_URL}` + '/loanpayment', fields).subscribe(
            (response: any) => {
                console.log("Account balance updated!");

                //save payment & update loan balance
                this.httpService.postForm(`${environment.LOANS_URL}` + '/payment', fields).subscribe(
                    (response: any) => {
                        console.log("Payment submitted successfully!");
                        this.modalRef.close();
                        this.router.navigateByUrl('/loans/paid');
                    }, error => {
                        console.log("Form submit failed - Status " + error.status);
                    }
                );

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

    //enable submit button when all fields are valid
    enableSubmit(): boolean {
        return this.paymentForm.valid;
    }

    //enable pay button only when status is active & balance isn't 0
    enablePay(i: any): boolean {
        return this.loans[i].statusTxt == "Active" && this.loans[i].balance < 0;
    }

}
