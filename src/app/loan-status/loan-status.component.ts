import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { environment } from 'src/environments/environment';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

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
    ) { }

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
    options: any  //payment account choices

    //define form field validators
    paymentForm = this.fb.group({
        account: ['', Validators.required],
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
        this.setAccountOptions();
    }

    //set choices for payment account
    setAccountOptions() {
        let size = 3;
        this.options = new Array(size + 1);
        this.options[0] = { value: '', text: 'Choose...' };

        for (let i = 1; i < this.options.length; i++) {
            this.options[i] = { value: i, text: "placeholder" };
        }
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
            
            //set status text & icon
            if (!this.loans[i].isApproved){
                this.loans[i].statusTxt = "Awaiting approval";
                this.loans[i].icon = -1;
            }
            else if (!this.loans[i].isConfirmed){
                this.loans[i].statusTxt = "Awaiting confirmation";
                this.loans[i].icon = -1;
            }
            else if (this.loans[i].balance == 0){
                this.loans[i].statusTxt = "Paid in full";
                this.loans[i].icon = 0;
            }
            else{
                this.loans[i].statusTxt = "Active";

                if(this.loans[i].paymentDue > 0)
                    this.loans[i].icon = 1;
                else
                    this.loans[i].icon = 0;
            }
            
        }

    }

    closeModal() {
        this.modalRef.close();
    }

    openModal(content: any, i: any) {
        this.modalHeader = this.loans[i].loanType;
        this.modalImage = this.loans[i].loanType.toLowerCase().replace(" ", "_") + ".jpg";

        this.modalInfo = [];
        this.modalInfo[0] = this.loans[i].balance;
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
    }
}
