import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/shared/services/http.service';
import { environment } from 'src/environments/environment';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { LoanApprovedComponent } from '../loanapproved/loanapproved.component';

@Component({
    selector: 'app-loan-status',
    templateUrl: './loan-status.component.html',
    styleUrls: ['./loan-status.component.css']
})
export class LoanStatusComponent implements OnInit {

    constructor(
        private httpService: HttpService,
        private modalService: NgbModal
    ) { }

    loans: any;
    totalLoans = 0;
    today = new Date();

    //modal variables
    modalRef!: NgbModalRef;
    errMsg: any;
    closeResult: any;
    modalHeader = "";
    modalInfo: any;

    ngOnInit(): void {
        this.loadAllLoans();
    }

    loadAllLoans() {
        this.httpService.getAll(`${environment.LOANS_URL}` + '/user/1').subscribe((res) => {
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
